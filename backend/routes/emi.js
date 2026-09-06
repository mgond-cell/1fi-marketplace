import express from "express";
import { listEmiTemplates, createMockOrder } from "../controllers/emiController.js";

const router = express.Router();

router.get("/emi-plans", listEmiTemplates);
router.post("/orders", createMockOrder);

export default router;
