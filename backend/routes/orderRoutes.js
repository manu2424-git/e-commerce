import express from "express";
import { allOrders, createOrder, getOrder, myOrders, updateOrderStatus } from "../controllers/orderController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = express.Router();
router.post("/", protect, createOrder);
router.get("/my", protect, myOrders);
router.get("/", protect, adminOnly, allOrders);
router.get("/:id", protect, getOrder);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
export default router;