import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
} from "../controllers/orderController.js";
const router = express.Router();

router.route("/mine").get(protect, getMyOrders);
router.route("/").get(protect,admin,getOrders).post(protect,addOrderItems);
router.route('/:id').get(protect,getOrderById);
router.route('/:id/pay').put(protect,admin,updateOrderToPaid);
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered);

export default router;