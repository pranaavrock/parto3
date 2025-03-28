import express from "express";
import {
  forgotPassword,
  loginUser,
  myProfile,
  register,
  resetPassword,
  verifyUser,
} from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";
import { addProgress, getYourProgress } from "../controllers/course.js";
import { createProfile, getProfile, updateProfile } from "../controllers/profile.js";
import { isProfileOwner } from "../middlewares/authMiddleware.js"; // New Middleware

const router = express.Router();

// User Routes
router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/me", isAuth, myProfile);
router.post("/user/forgot", forgotPassword);
router.post("/user/reset", resetPassword);

// User Progress Routes
router.post("/user/progress", isAuth, addProgress);
router.get("/user/progress", isAuth, getYourProgress);

// Profile Routes
router.post("/user/profile", isAuth, createProfile); // Only authenticated users can create a profile
router.get("/user/profile/:id", isProfileOwner, getProfile); // Only profile owner or admin can access
router.put("/user/profile", isProfileOwner, updateProfile); // Only profile owner or admin can update

export default router;
