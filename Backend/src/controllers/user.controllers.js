import { User } from "../models/user.models.js";
import { Otp } from "../models/otp.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { transporter } from "../utils/transporter.js";
import bcrypt from "bcrypt";
import { client, TWILIO_SERVICE_SID } from "../utils/twilio.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findOne(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
    res.json(new ApiError(400, "Error generating token! ", err));
  }
};

const sendEmailOtp = async (data) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: {
        name: "TrophyBook App",
        address: process.env.AUTH_EMAIL,
      },
      to: data.email,
      subject: "Verify your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete your signup</p><p>This otp expires in 1 hour.</p>`,
    };

    const hashedOtp = await bcrypt.hash(otp, 12);
    const newOtp = new Otp({
      userId: data.data._id,
      otp: hashedOtp,
    }).save();

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const verifyEmailOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!otp) {
      throw Error(`Fill the otp first`);
    } else if (!userId) {
      throw Error("userId not specified");
    } else {
      const main_user = await User.findOne({ _id: userId });

      if (main_user.verified == true) {
        throw new Error("User Already verified.");
      }
      const user = await Otp.find({ userId });

      if (user.length <= 0) {
        throw new Error("Account record doesn't exist , Sign up first.");
      } else {
        let verify = false;
        for (let i = 0; i < user.length; i++) {
          const hashedOtp = user[i].otp;
          const { expiresAt } = user[i];

          if (expiresAt < Date.now()) {
            await Otp.deleteMany({ userId });
            throw new Error("Otp has expired , please request again");
          } else {
            verify = await bcrypt.compare(otp, hashedOtp);

            if (verify == true) {
              await User.updateOne({ _id: userId }, { verified: true });
              await UserVerificationModel.deleteMany({ userId });
              res.status(201).json({
                status: "verified",
                message: "Email verified successfully",
              });
              break;
            }
          }
        }

        if (!verify) {
          throw new Error("The otp entered is wrong. Please try again.");
        }
      }
    }
  } catch (err) {
    throw new ApiError(400, "verification failed", err.message);
  }
};

const sendMobileOtp = async (payload) => {
  const { countryCode, mobile } = payload;
  try {
    const otpResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `${countryCode}${mobile}`,
        channel: "sms",
      });
    return otpResponse;
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Error sending mobile otp ", error);
  }
};

const verifyMobileOtp = async (req, res) => {
  const { countryCode, mobile, otp } = req.body;
  try {
    console.log(TWILIO_SERVICE_SID);
    const verifiedResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `${countryCode}${mobile}`,
        code: otp,
      });
    console.log(verifiedResponse);
    res
      .status(200)
      .json(
        new ApiResponse(200, verifiedResponse, "Mobile verified successfully")
      );
  } catch (error) {
    res.json(new ApiError(400, "Error verifying mobile ", error));
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, mobile, password, countryCode } = req.body;
    if (!username || !email || !mobile || !password || !countryCode) {
      return res.json(new ApiError(410, "All fields are required!"));
    }
    const user = await User.findOne({ email });
    if (user && user.isEmailVerified === true) {
      return res.json(new ApiResponse(409, "User already exists!"));
    } else if (user && (!user.isEmailVerified || !user.mobile.isVerified)) {
      await sendEmailOtp({ data: user, email: user.email });
      await sendMobileOtp({
        countryCode: user.mobile.countryCode,
        mobile: user.mobile.number,
      });
      return res.json(
        new ApiResponse(
          400,
          user,
          "User already exists! Please verify your email."
        )
      );
    }
    const newUser = await User.create({
      username,
      email,
      mobile: {
        countryCode,
        number: mobile,
      },
      password,
    });
    await sendEmailOtp({ data: newUser, email: newUser.email });
    await sendMobileOtp({
      countryCode,
      mobile,
    });
    return res.json(
      new ApiResponse(
        201,
        newUser,
        "User registered successfully! Please verify your email."
      )
    );
  } catch (error) {
    res.json(
      new ApiError(400, error?.message || "Error registering user ", error)
    );
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      throw new ApiError(410, "All fields are required!");
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.json(new ApiError(404, "User does not exist!"));
    }
    if (!user.verified) {
      return res.json(new ApiError(401, "Please verify your Email!"));
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.json(new ApiError(401, "Password incorrect!"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
  } catch (err) {
    console.log(err);
    res.json(new ApiError(400, "Error logging in user ", err));
  }
};

const getCurrentUser = async (req, res) => {
  try {
    if (req.user) {
      return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User found successfully!"));
    } else {
      return res.status(401).json(new ApiError(401, "User Not Found"));
    }
  } catch (err) {
    res.json(new ApiError(400, "Error getting user "));
  }
};

const logoutUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $unset: { refreshToken: "" },
      },
      {
        new: true,
      }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, "You have been logged out successfully"));
  } catch (error) {
    res.json(new ApiError(400, "An error occured during logout"));
  }
};

export {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  verifyEmailOtp,
  sendMobileOtp,
  verifyMobileOtp,
};
