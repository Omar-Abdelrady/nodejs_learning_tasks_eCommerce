import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/login", authUser);
route.post("/register", registerUser);
route.get("/profile", protect, getUserProfile);
route.put("/profile", protect, updateUserProfile);

export default route;
