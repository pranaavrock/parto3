// import { Profile } from "../models/Profile.js";
// import { User } from "../models/User.js";

// // Create or Update Profile
// export const createProfile = async (req, res) => {
//   try {
//     const { username, bio, gender, dateOfBirth, phoneNumber } = req.body;
//     const userId = req.user.id; // Extracted from isAuth middleware

//     let profile = await Profile.findOne({ user: userId });

//     if (profile) {
//       return res.status(400).json({ message: "Profile already exists" });
//     }

//     profile = new Profile({
//       user: userId,
//       username,
//       bio,
//       gender,
//       dateOfBirth,
//       phoneNumber,
//     });

//     await profile.save();
//     res.status(201).json({ message: "Profile created successfully", profile });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Get Profile
// export const getProfile = async (req, res) => {
//   try {
//     const userId = req.user.id; // Extracted from isAuth middleware

//     const profile = await Profile.findOne({ user: userId }).lean();
//     if (!profile) return res.status(404).json({ message: "Profile not found" });

//     const user = await User.findById(userId)
//       .select("name email role mainrole subscription")
//       .lean();
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json({ ...user, ...profile, userId: user._id });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Update Profile
// export const updateProfile = async (req, res) => {
//   try {
//     const { username, bio, gender, dateOfBirth, phoneNumber } = req.body;
//     const userId = req.user.id;

//     let profile = await Profile.findOne({ user: userId });
//     if (!profile) return res.status(404).json({ message: "Profile not found" });

//     profile.username = username || profile.username;
//     profile.bio = bio || profile.bio;
//     profile.gender = gender || profile.gender;
//     profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
//     profile.phoneNumber = phoneNumber || profile.phoneNumber;

//     await profile.save();
//     res.json({ message: "Profile updated successfully", profile });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

import { Profile } from "../models/Profile.js";
import { User } from "../models/User.js";

// Create Profile (Ensuring Unique Username & Phone Number)
export const createProfile = async (req, res) => {
  try {
    const { username, bio, gender, dateOfBirth, phoneNumber } = req.body;
    const userId = req.user.id; // Extracted from isAuth middleware

    let existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    // Ensure unique username and phone number
    const usernameExists = await Profile.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const phoneExists = await Profile.findOne({ phoneNumber });
    if (phoneExists) {
      return res.status(400).json({ message: "Phone number already in use" });
    }

    const profile = new Profile({
      user: userId,
      username,
      bio,
      gender,
      dateOfBirth,
      phoneNumber,
    });

    await profile.save();
    res.status(201).json({ message: "Profile created successfully", profile });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Profile (Ensuring Complete Data)
export const getProfile = async (req, res) => {
  try {
    console.log("🔹 Request received at /profile route");
    console.log("🔹 User ID from request:", req.params.id);

    const userId = req.params.id;
    if (!userId) {
      console.log("❌ No user ID found in request.");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const profile = await Profile.findOne({ user: userId }).lean();
    if (!profile) {
      console.log("❌ Profile not found for user ID:", userId);
      return res.status(404).json({ message: "Profile not found" });
    }

    console.log("✅ Profile found:", profile);

    const user = await User.findById(profile.user)
      .select("name email role mainrole subscription createdAt lastLogin")
      .lean();

    if (!user) {
      console.log("❌ User not found for profile:", profile.user);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User details found:", user);

    res.json({
      profileId: profile._id,
      userId: user._id,
      fullName: user.name || "N/A",
      username: profile.username || "",
      email: user.email || "",
      bio: profile.bio || "",
      gender: profile.gender || "",
      dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.toISOString().split("T")[0] : "",
      phoneNumber: profile.phoneNumber || "",
      joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A",
      lastLogin: user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A",
      role: user.mainrole || "user",
    });

    console.log("✅ Profile data sent successfully.");
  } catch (error) {
    console.error("🔥 Error fetching profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




// Update Profile (Using findOneAndUpdate for Efficiency)
export const updateProfile = async (req, res) => {
  try {
    const { username, bio, gender, dateOfBirth, phoneNumber } = req.body;
    const userId = req.user.id;

    let profile = await Profile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    // Ensure username and phone number are not used by others
    if (username && username !== profile.username) {
      const usernameExists = await Profile.findOne({ username });
      if (usernameExists) return res.status(400).json({ message: "Username already taken" });
    }

    if (phoneNumber && phoneNumber !== profile.phoneNumber) {
      const phoneExists = await Profile.findOne({ phoneNumber });
      if (phoneExists) return res.status(400).json({ message: "Phone number already in use" });
    }

    profile = await Profile.findOneAndUpdate(
      { user: userId },
      { username, bio, gender, dateOfBirth, phoneNumber },
      { new: true, runValidators: true }
    );

    res.json({ message: "Profile updated successfully", profile });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
