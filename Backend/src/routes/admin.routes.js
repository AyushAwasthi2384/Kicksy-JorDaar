import { Router } from "express";
import {
  addProduct,
  addProductImage,
  deleteProduct,
  deleteProductImage,
  getProducts,
  getProductsCount,
  handleProductStock,
  updateProduct,
} from "../controllers/product.controllers.js";

import { upload } from "../middlewares/multer.middlewares.js";

import {
  addBlog,
  attachProductToBlog,
  deleteBlog,
  editBlogBody,
  editBlogImage,
  fetchAllBlog,
  fetchBlogById,
} from "../controllers/blog.controllers.js";

import {
  banUser,
  changeUserState,
  checkAdmin,
  createAdmin,
  fetchAdmins,
  getActiveUsersCount,
  getOrders,
  getSellers,
  getUsers,
  getUsersCount,
  removeBanUser,
} from "../controllers/admin.controllers.js";

import {
  addProductViaRequest,
  declineProductRequest,
  editProductRequest,
  getProductRequestById,
  getProductRequests,
} from "../controllers/admin-product.controllers.js";
import {
  acceptSellerRequest,
  declineSellerRequest,
  getSellerRequestById,
  getSellerRequests,
} from "../controllers/admin-seller.controllers.js";
import { getSellerById } from "../controllers/seller.controllers.js";

const router = Router();

router.route("/create-admin").post(createAdmin);
router.route("/check-admin").post(checkAdmin);
router.route("/fetch-admins").post(fetchAdmins);
router.route("/add-product-image").post(upload.array("image"), addProductImage);
router.route("/add-product").post(addProduct);
router.route("/update-stock").post(handleProductStock);
router.route("/update-product").post(updateProduct);
router.route("/delete-product").post(deleteProduct);
router.route("/delete-product-image").post(deleteProductImage);
router.route("/add-blog").post(upload.single("image"), addBlog);
router.route("/edit-blog-image").post(upload.single("image"), editBlogImage);
router.route("/edit-blog-body").post(editBlogBody);
router.route("/attach-product-to-blog").post(attachProductToBlog);
router.route("/delete-blog").post(deleteBlog);
router.route("/fetch-blog/id").post(fetchBlogById);
router.route("/fetch-blogs").get(fetchAllBlog);
router.route("/get-users").get(getUsers);
router.route("/get-sellers").get(getSellers);
router.route("/get-seller/id").post(getSellerById);
router.route("/get-products").get(getProducts);
router.route("/change-user-state").post(changeUserState);
router.route("/total-active-users").get(getActiveUsersCount);
router.route("/total-products-count").get(getProductsCount);
router.route("/total-users-count").get(getUsersCount);
router.route("/ban-user").post(banUser);
router.route("/remove-ban-user").post(removeBanUser);
router.route("/get-all-orders").get(getOrders);

// routes for handling seller requests
router.route("/requests/seller/getAll").get(getSellerRequests);
router.route("/requests/seller/get-by-id").post(getSellerRequestById);
router.route("/requests/seller/accept-request").post(acceptSellerRequest);
router.route("/requests/seller/decline-request").post(declineSellerRequest);

// routes for handling product requests
router.route("/requests/product/getAll").get(getProductRequests);
router.route("/requests/product/get-by-id").post(getProductRequestById);
router.route("/requests/product/edit").post(editProductRequest);
router.route("/requests/product/accept-request").post(addProductViaRequest);
router.route("/requests/product/decline-request").post(declineProductRequest);
export default router;
