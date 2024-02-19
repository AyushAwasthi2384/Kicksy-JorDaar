import { Admin } from "../models/admin.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.json(new ApiResponse(409, "Admin already exists!"));
    }
    
    const newAdmin = await Admin.create({ email });
    return res.json(
      new ApiResponse(201, newAdmin, "Admin created successfully!")
    );
  } 
  catch (error) {
    throw new ApiError(400, "Error creating admin ", error);
  }
};

const checkAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.json(new ApiResponse(200, "Admin exists!"));
    }
    return res.json(new ApiResponse(401, "Unauthorized!"));
  } catch (error) {
    throw new ApiError(400, "Error checking admin ", error);
  }
};

export { createAdmin, checkAdmin };