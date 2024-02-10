import { Router } from "express";
import {
  addProduct,
  addProductImage,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controllers.js";

import { upload } from "../middlewares/multer.middleware.js";

import {
  addBlog,
  deleteBlog,
  editBlog,
  fetchBlog,
} from "../controllers/blog.controller.js";

const router = Router();

router
  .route("/add-product-image")
  .post(upload.single("productImage"), addProductImage);

router.route("/add-product").post(addProduct);
router.route("/update-product").post(updateProduct);
router.route("/delete-product").post(deleteProduct);

router.route("/add-blog").post(addBlog);

router.route("/edit-blog").post(editBlog);

router.route("/delete-blog").post(deleteBlog);
router.route("/fetch-blog").post(fetchBlog);

export default router;
