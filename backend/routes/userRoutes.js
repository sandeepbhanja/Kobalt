import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateProfile,
  getUsers,
  getUserById,
  updateUsers,
  deleteUser,
} from "../controllers/userController.js";
import {protect,admin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/").get(protect,admin,getUsers).post(registerUser);
router.post('/logout' , logoutUser);
router.post('/auth',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateProfile);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUsers);

export default router;