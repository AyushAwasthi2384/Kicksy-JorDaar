import { Router } from 'express';
import { upload } from "../middlewares/multer.middlewares.js";

import {
  acceptProductRequest,
  createSeller,
  getAllRequests,
  productAddRequest
} from '../controllers/seller.controllers.js';

const router = Router();

router.route('/create-seller').post(upload.single("image"),createSeller);
router.route('/create-request').post(productAddRequest);
router.route('/fetch-requests').post(getAllRequests);
router.route('/accept-request').post(acceptProductRequest);

export default router;