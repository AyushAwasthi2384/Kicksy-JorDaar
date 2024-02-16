import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
  verifyEmailOtp,
  sendMobileOtp,
  verifyMobileOtp,
} from "../controllers/user.controllers.js";

import {
  addListName,
  addToCart,
  addToList,
  deleteFromCart,
  removeFromList,
  removeList,
} from "../controllers/cart.controller.js";

import { getAllProducts } from "../controllers/product.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/verify-email-otp").post(verifyEmailOtp);
router.route("/send-mobile-otp").post(sendMobileOtp);
router.route("/verify-mobile-otp").post(verifyMobileOtp);
router.route("/login").post(loginUser);
router.route("/add-to-cart").post(addToCart);
router.route("/delete-from-cart").post(deleteFromCart);
router.route("/add-list-name").post(addListName);
router.route("/add-to-list").post(addToList);
router.route("/remove-list").post(removeList);
router.route("/remove-product-from-list").post(removeFromList);
router.route("/get-current-user").get(verifyJWT, getCurrentUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/get-all-products").get(getAllProducts);
export default router;
