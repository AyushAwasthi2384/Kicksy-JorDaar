import { Router } from "express";
import {
  makePayment,
  verifyPayment,
  getKey,
  fetchall,
} from "../controllers/payment.controllers.js";

const router = Router();

router.route("/make-payment").post(makePayment);
router.route("/verify-payment").post(verifyPayment);
router.route("/get-key").get(getKey);
router.route("/fetch-all").get(fetchall);

export default router;
