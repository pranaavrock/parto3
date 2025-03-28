import React, { useState, useEffect } from "react";
import { UserData } from "../../context/UserContext";
import axios from "axios";
import "./adminprofile.css";
import { useNavigate } from "react-router-dom";


const AdminProfile = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const { user } = UserData();
  const [profileData, setProfileData] = useState({
    fullName: "",
    username: "",
    email: "",
    profilePicture: "/default-avatar.png",
    bio: "",
    gender: "",
    dateOfBirth: "",
    phoneNumber: "",
    userId: "N/A",
    joinDate: "N/A",
    lastLogin: "N/A",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModified, setIsModified] = useState(false);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:y", token); // ✅ Debugging: Check if token is correct
    
        const res = await axios.get(`http://localhost:5000/api/user/profile/${user?._id}`, {
          headers: { token }, // Ensure token is correct
          withCredentials: true,
        });
    
        console.log("API Response:", res.data); // ✅ Debugging: See API response
    
        const data = res.data;
        setProfileData({
          fullName: data.fullName || "N/A",
          username: data.username || "",
          email: data.email || "",
          profilePicture: data.profilePicture || "/default-avatar.png",
          bio: data.bio || "",
          gender: data.gender || "",
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          phoneNumber: data.phoneNumber || "",
          userId: data.userId || "N/A",
          joinDate: data.joinDate || "N/A",
          lastLogin: data.lastLogin || "N/A",
          role: data.role || "user",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("Failed to load profile.");
      }
    };

    if (user) fetchProfile();
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
    setIsModified(true);
  };

  // Handle image upload preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData({ ...profileData, profilePicture: imageUrl });
      setIsModified(true);
    }
  };

  // Save profile changes
  const handleSave = async () => {
    if (!isModified) {
      console.warn("⚠️ No changes detected — Aborting update.");
      return;
    }
  
    setLoading(true);
    setMessage("");
  
    try {
      const token = localStorage.getItem("token");
      console.log("🟡 Token retrieved:", token);
  
      const updatedData = {
        username: profileData.username,
        bio: profileData.bio,
        gender: profileData.gender,
        dateOfBirth: profileData.dateOfBirth,
        phoneNumber: profileData.phoneNumber,
      };
  
      console.log("📦 Data being sent to API:", updatedData);
  
      const res = await axios.put("http://localhost:5000/api/user/profile", updatedData, {
        headers: { token },  // Corrected header
        withCredentials: true,
      });
  
      console.log("✅ Server Response:", res.data);
  
      setMessage("Profile updated successfully!");
      setIsModified(false);
    } catch (error) {
      console.error("❌ Error updating profile:", error);
  
      // Improved error message handling
      if (error.response) {
        console.error("🟥 Server Response Error:", error.response.data);
        setMessage(error.response.data.message || "Failed to update profile.");
      } else if (error.request) {
        console.error("🟠 No Response Received:", error.request);
        setMessage("Server is not responding. Please try again.");
      } else {
        console.error("🔴 Axios Error:", error.message);
        setMessage("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="admin-profile-container">
    <div className="admin-profile-card">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
      <h2 className="profile-header">Admin Profile</h2>
      <div className="profile-section">
        <div className="profile-picture">
          <img src={profileData.profilePicture} alt="Profile" />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <div className="profile-info">
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={profileData.fullName} disabled />
          </div>
          <div className="input-group">
            <label>Username</label>
            <input type="text" name="username" value={profileData.username} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="text" name="email" value={profileData.email} disabled />
          </div>
          <div className="input-group">
            <label>Bio</label>
            <textarea name="bio" value={profileData.bio} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Gender</label>
            <select name="gender" value={profileData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="input-group">
            <label>Date of Birth</label>
            <input type="date" name="dateOfBirth" value={profileData.dateOfBirth} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" value={profileData.phoneNumber} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="account-details">
        <h3>Account Details</h3>
        <p><strong>User ID:</strong> {profileData.userId}</p>
        <p><strong>Join Date:</strong> {profileData.joinDate}</p>
        <p><strong>Last Login:</strong> {profileData.lastLogin}</p>
      </div>

      <div className="role-details">
        <h3>Subscription & Roles</h3>
        <p><strong>Role:</strong> {profileData.role}</p>
      </div>

      {message && <p className="status-message">{message}</p>}
      <button className="save-btn" onClick={handleSave} disabled={!isModified || loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  </div>
  );
};

export default AdminProfile;

