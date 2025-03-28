// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Layout from "../../Utils/Layout";
// import "./adduser.css";

// export const server = "http://localhost:5000"; // Example backend URL


// const AddUser = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({ name: "", email: "", role: "user" });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const { data } = await axios.post(
//         `${server}/api/users`,
//         { ...user },
//         { headers: { token: localStorage.getItem("token") } }
//       );

//       setSuccess("User added successfully!");
//       setTimeout(() => navigate("/admin-dashboard"), 1500); // Redirect after 1.5 seconds
//     } catch (err) {
//       if (err.response?.status === 400) {
//         setError("User already exists!");
//       } else {
//         setError("Something went wrong!");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="add-user-container">
//         <h2>Add New User</h2>

//         {error && <p className="error">{error}</p>}
//         {success && <p className="success">{success}</p>}

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter name"
//             value={user.name}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Enter email"
//             value={user.email}
//             onChange={handleChange}
//             required
//           />

//           <select name="role" value={user.role} onChange={handleChange}>
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>

//           <button type="submit" disabled={loading}>
//             {loading ? "Adding..." : "Add User"}
//           </button>
//           <button type="button" className="back-btn" onClick={() => navigate("/admin-dashboard")}>
//             Back
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default AddUser;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../admin/Utils/Layout";
import "./adduser.css";

export const server = "http://localhost:5000"; // Example backend URL

const AddUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
        const { data } = await axios.post(
            `${server}/api/add-user`, // Updated API route
            { ...user },
            { headers: { token: localStorage.getItem("token") } }
          );
          

      setSuccess("User added successfully!");
      setTimeout(() => navigate("/admin/dashboard"), 1500); // Redirect after 1.5 seconds
    } catch (err) {
      if (err.response?.status === 400) {
        setError("User already exists!");
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="add-user-container">
        <h2>Add New User</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSubmit}>
        <input
  type="text"
  name="name"
  placeholder="Enter name"
  value={user.name}
  onChange={handleChange}
  required
/>

<input
  type="email"
  name="email"
  placeholder="Enter email"
  value={user.email}
  onChange={handleChange}
  required
/>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <select name="role" value={user.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add User"}
          </button>
          <button type="button" className="back-btn" onClick={() => navigate("/admin/dashboard")}>
            Back
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddUser;
