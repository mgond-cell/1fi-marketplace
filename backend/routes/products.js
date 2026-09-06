import express from "express";
import { listProducts, getProductDetail } from "../controllers/productController.js";

const router = express.Router();

router.get("/", listProducts);
router.get("/:productId", getProductDetail);

export default router;
