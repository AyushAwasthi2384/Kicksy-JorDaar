import { SellerRequest } from "../models/request.model.js";
import { Seller } from "../models/seller.model.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteFromAws } from "../utils/aws.js";

const getAllSellerRequests = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const requests = await SellerRequest.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(
      new ApiResponse(200, { requests, page }, "requests fetched successfully")
    );
  } catch (err) {
    return res.json(new ApiError(400, err.message));
  }
};


const acceptSellerRequest = async (req, res) => {
  try {
    const { requestID } = req.body;
    const request = await SellerRequest.findOne({ _id: requestID })
    if (!request) return res.json(new ApiResponse(404, 'request not found'));


    const user = await User.findOne({ _id: request.userID });
    if (!user) return res.json(new ApiResponse(404, 'user not found'))

    user.role = 'seller';
    await user.save();

    const {
      whatsappNumber,
      gstNumber,
      storeName,
      storeLogo,
      storeAddress,
      userID,
      website,
      instagram,
      notes
    } = request

    console.log("38 " + request.whatsappNumber)
    const seller = new Seller({
      whatsappNumber,
      gstNumber,
      storeName,
      storeLogo,
      storeAddress,
      userID,
      website,
      instagram,
      notes
    });
    await seller.save();

    await SellerRequest.findByIdAndDelete({ _id: requestID });

    return res.json(new ApiResponse(200, seller, 'seller created'))


  }
  catch (err) {
    console.log(err);
    return res.json(new ApiError(400, err.message))
  }
}

const declineSellerRequest = async (req, res) => {
  const { requestID } = req.body;
  try {
    const request = await SellerRequest.findByIdAndDelete({ _id: requestID });

    await deleteFromAws(request.storeLogo);

    if (!request) return res.json(new ApiResponse(404, 'request not found'));

    return res.json(new ApiResponse(200, request, 'Seller request deleted successfully'));
  }
  catch (err) {
    return res.json(new ApiError(400, err.message, err));
  }
}

export {
  getAllSellerRequests,
  acceptSellerRequest,
  declineSellerRequest
};
