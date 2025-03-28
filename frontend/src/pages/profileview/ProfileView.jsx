import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Edit } from "lucide-react";
import "./profileView.css";

export default function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Extracted ID from URL:", id);
    if (!id) {
      setError("User ID is missing from URL");
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized: No token provided");

        const response = await fetch(`http://localhost:5000/api/profile/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json", token: token },
          credentials: "include",
        });

        if (!response.ok) throw new Error(`Failed to fetch profile: ${response.status}`);
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!profile) return <p className="loading">Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
        <button onClick={() => navigate("/account1")} className="edit-btn">
          <Edit size={16} />
          Edit Profile
        </button>
      </div>

      <div className="profile-card">
        <img src="https://via.placeholder.com/100" alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h3>{profile.fullName}</h3>
          <p>@{profile.username}</p>
        </div>
      </div>

      <div className="profile-details">
        <ProfileField label="Email" value={profile.email} />
        <ProfileField label="Phone Number" value={profile.phoneNumber || "N/A"} />
        <ProfileField label="Date of Birth" value={profile.dateOfBirth || "N/A"} />
        <ProfileField label="Gender" value={profile.gender || "N/A"} />
        <ProfileField label="Join Date" value={profile.joinDate} />
        <ProfileField label="Last Login" value={profile.lastLogin} />
        <ProfileField label="Role" value={profile.role} />
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="profile-field">
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </div>
  );
}
