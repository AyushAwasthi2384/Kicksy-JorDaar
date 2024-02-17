import { useState } from "react";
import { authRegister } from "../../api/auth.api";
import { Input, Logo, Button, Select } from "../../components/index.ts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import style from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const [error, setError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const isValidEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    setIsEmailValid(isValidEmail); // Update email validation state
  };
  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    const isValidPhone = phone.match(/^[0-9]{10}$/g);
    setIsPhoneValid(isValidPhone); // Update phone validation state
  };

  const handleRegister = async (data) => {
    setError("");
    try {
      const response = await authRegister(data);
      if (response.statusCode === 201 || response.statusCode === 400) {
        navigate("/verify");
      } else if (response.statusCode === 409) {
        setError(response.message);
        navigate("/login");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={style.Body}>
      <div className={style.CenterBody}>
        <div className={style.logo}>
          <Logo />
        </div>
        <h2 className={style.heading}>Register</h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your Full Name"
            {...register("username", { required: true })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: (value) => {
                const isValidEmail = value.match(
                  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                );
                setIsEmailValid(isValidEmail);
                return true; // Always return true to avoid validation error
              },
            })}
            onChange={handleEmailChange} // Call handleEmailChange on input change
          />
          {isEmailValid ? (
            <button>Send OTP</button>
          ) : (
            <p className={style.error}>Please enter a valid email address</p>
          )}
          <div className={style.mobile}>
            <Select
              options={["+91", "+92", "+93", "+94", "+95", "+96", "+97", "+98"]}
              {...register("countryCode", { required: true })}
            />
            <Input
              label="Mobile"
              type="text"
              placeholder="Enter your mobile number"
              {...register("phone", {
                required: true,
                validate: (value) => {
                  const isValidPhone = value.match(/^[0-9]{10}$/g);
                  setIsPhoneValid(isValidPhone);
                  return true; // Always return true to avoid validation error
                },
              })}
              onChange={handlePhoneChange} // Call handlePhoneChange on input change
            />
            {isPhoneValid ? (
              <button>Send OTP</button>
            ) : (
              <p className={style.error}>Please enter a valid mobile number</p>
            )}
          </div>
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Enter confirmation password"
            {...register("confirm-password", {
              required: true,
              validate: (value) => {
                if (value !== watch("password")) {
                  setPasswordError("Password does not match");
                  return "Password does not match";
                }
                return true;
              },
            })}
          />
          {passwordError && <p className={style.error}>{passwordError}</p>}
          <Button
            className={style.button}
            style={{ backgroundColor: "#131313", color: "white" }}
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
