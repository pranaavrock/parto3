import express from "express";
import { isAdmin, isAdmin1, isAuth, isAuthenticated } from "../middlewares/isAuth.js";
import { addUser } from "../controllers/user.js";
import { uploadFiles } from "../middlewares/multer.js";
import {
  addLectures,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllStats,
  getAllUsers,
  updateRole,
  getAllCourses,
  getAllLectures,
} from "../controllers/admin.js";
import { getProfile, updateProfile } from "../controllers/profile.js";

const router = express.Router();

// User Management
router.post("/add-user", isAuthenticated, isAdmin1, addUser);
router.put("/user/:id", isAuth, isAdmin, updateRole);
router.get("/users", isAuth, isAdmin, getAllUsers);

// Course & Lecture Management
router.post("/course/new", isAuth, isAdmin, uploadFiles, createCourse);
router.post("/course/:id", isAuth, isAdmin, uploadFiles, addLectures);
router.delete("/course/:id", isAuth, isAdmin, deleteCourse);
router.delete("/lecture/:id", isAuth, isAdmin, deleteLecture);
router.get("/courses", isAuth, isAdmin, getAllCourses);
router.get("/lectures", isAuth, isAdmin, getAllLectures);

// Statistics
router.get("/stats", isAuth, isAdmin, getAllStats);

// Profile Management (Admin)
router.get("/profile/:id", isAuth, isAdmin, getProfile); // Admin can view any profile
router.put("/profile/:id", isAuth, isAdmin, updateProfile); // Admin can update any profile

export default router;
