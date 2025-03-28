import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: { type: String, required: true, unique: true },
    bio: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dateOfBirth: { type: Date },
    phoneNumber: { type: String, unique: true },
    lastLogin: { type: Date, default: null },
  },
  { timestamps: true }
);

export const Profile = mongoose.model("Profile", profileSchema);
