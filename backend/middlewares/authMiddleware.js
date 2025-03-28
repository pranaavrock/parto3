import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Profile } from "../models/Profile.js";

export const isProfileOwner = async (req, res, next) => {
  try {
    console.log("Middleware triggered: isProfileOwner");

    const token = req.headers.token;
    if (!token) {
      console.log("No token provided");
      return res.status(403).json({ message: "Please Login" });
    }

    let decodedData;
    try {
      decodedData = jwt.verify(token, process.env.Jwt_Sec);
      console.log("Decoded Token Data:", decodedData);
    } catch (error) {
      console.log("Token verification failed:", error.message);
      return res.status(401).json({ message: "Invalid or Expired Token" });
    }

    const user = await User.findById(decodedData._id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    const profile = await Profile.findOne({ user: user._id });
    if (!profile) {
      console.log("Profile not found");
      return res.status(404).json({ message: "Profile not found" });
    }

    const isAdmin = user.role === "admin";
    const isOwner = profile.user.toString() === user._id.toString();

    console.log("User Role:", user.role);
    console.log("Profile Owner Match:", isOwner);
    console.log("Is Admin:", isAdmin);

    if (!isAdmin && !isOwner) {
      console.log("Access Denied: User is neither admin nor profile owner");
      return res.status(403).json({ message: "You are not authorized to access this profile" });
    }

    console.log("Access Granted");
    next();
  } catch (error) {
    console.error("Middleware Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
