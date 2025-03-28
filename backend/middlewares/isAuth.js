import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
export const isAuth = async (req, res, next) => {
  try {
    console.log("🔹 Checking authentication...");

    const token = req.headers.token;
    console.log("🔹 Received token:", token || "No token provided");

    if (!token) {
      console.log("❌ No token found in headers. Rejecting request.");
      return res.status(403).json({ message: "Please Login" });
    }

    let decodedData;
    try {
      decodedData = jwt.verify(token, process.env.Jwt_Sec);
      console.log("✅ Token successfully decoded:", decodedData);
    } catch (err) {
      console.log("❌ Token verification failed:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = await User.findById(decodedData._id);
    if (!req.user) {
      console.log("❌ User not found in database:", decodedData._id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User authenticated:", req.user._id);
    next();
  } catch (error) {
    console.error("🔥 Error in isAuth middleware:", error.message);
    res.status(500).json({ message: "Login First" });
  }
};
export const isAdmin = (req, res, next) => {
  try {
    console.log("🔹 Checking admin privileges for user:", req.user?._id || "Unknown User");

    if (!req.user) {
      console.log("❌ No user data found in request.");
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("🔹 User role:", req.user.role);

    if (req.user.role !== "admin") {
      console.log("❌ Access denied. User is not an admin.");
      return res.status(403).json({ message: "You are not admin" });
    }

    console.log("✅ User is an admin. Access granted.");
    next();
  } catch (error) {
    console.error("🔥 Error in isAdmin middleware:", error.message);
    res.status(500).json({ message: error.message });
  }
};
 

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.Jwt_Sec);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export const isAdmin1 = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied: Admin Only" });
  }
  next();
};
