// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Layout from "../Utils/Layout";
// import axios from "axios";
// import { server } from "../../main";
// import "./dashboard.css";

// const AdminDashboard = ({ user }) => {
//   const navigate = useNavigate();

//   if (user && user.role !== "admin") return navigate("/");

//   const [stats, setStats] = useState({});
//   const [courses, setCourses] = useState([]);
//   const [lectures, setLectures] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedView, setSelectedView] = useState("courses");

//   useEffect(() => {
//     fetchStats();
//     fetchCourses();
//     fetchLectures();
//     fetchUsers();
//   }, []);

//   async function fetchStats() {
//     try {
//       const { data } = await axios.get(`${server}/api/stats`, {
//         headers: { token: localStorage.getItem("token") },
//       });
//       setStats(data.stats);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function fetchCourses() {
//     try {
//       const { data } = await axios.get(`${server}/api/courses`, {
//         headers: { token: localStorage.getItem("token") },
//       });
//       setCourses(data.courses);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function fetchLectures() {
//     try {
//       const { data } = await axios.get(`${server}/api/lectures`, {
//         headers: { token: localStorage.getItem("token") },
//       });
//       setLectures(data.lectures);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function fetchUsers() {
//     try {
//       const { data } = await axios.get(`${server}/api/users`, {
//         headers: { token: localStorage.getItem("token") },
//       });
//       setUsers(data.users);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <Layout>
//       <div className="dashboard-container">
//         {/* Left Side - Stats */}
//         <div className="stats-container">
//           <div className="box" onClick={() => setSelectedView("courses")}>
//             <p>Total Courses</p>
//             <p>{stats.totalCoures}</p>
//           </div>
//           <div className="box" onClick={() => setSelectedView("lectures")}>
//             <p>Total Lectures</p>
//             <p>{stats.totalLectures}</p>
//           </div>
//           <div className="box" onClick={() => setSelectedView("users")}>
//             <p>Total Users</p>
//             <p>{stats.totalUsers}</p>
//           </div>
//         </div>

//         {/* Right Side - Table View */}
//         <div className="table-container">
//           {selectedView === "courses" && (
//             <>
//               <h2>All Courses</h2>
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Title</th>
//                     <th>Category</th>
//                     <th>Created By</th>
//                     <th>Duration</th>
//                     <th>Price</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {courses.map((course) => (
//                     <tr key={course._id}>
//                       <td>{course.title}</td>
//                       <td>{course.category}</td>
//                       <td>{course.createdBy}</td>
//                       <td>{course.duration}</td>
//                       <td>${course.price}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </>
//           )}

//           {selectedView === "lectures" && (
//             <>
//               <h2>All Lectures</h2>
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Title</th>
//                     <th>Description</th>
//                     <th>Course</th>
//                     <th>Video</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {lectures.map((lecture) => (
//                     <tr key={lecture._id}>
//                       <td>{lecture.title}</td>
//                       <td>{lecture.description}</td>
//                       <td>{lecture.course}</td>
//                       <td>
//                         <a href={lecture.video} target="_blank" rel="noopener noreferrer">
//                           View
//                         </a>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </>
//           )}

//           {selectedView === "users" && (
//             <>
//               <h2>All Users</h2>
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user) => (
//                     <tr key={user._id}>
//                       <td>{user.name}</td>
//                       <td>{user.email}</td>
//                       <td>{user.role}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import "./dashboard.css";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  // Redirect if the user is not an admin
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const [stats, setStats] = useState({});
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedView, setSelectedView] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");

  // Fix: Define useState hooks inside the component
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" });

  useEffect(() => {
    fetchStats();
    fetchCourses();
    fetchLectures();
    fetchUsers();
  }, []);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: { token: localStorage.getItem("token") },
      });
      console.log(data.stats);
      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCourses() {
    try {
      const { data } = await axios.get(`${server}/api/courses`, {
        headers: { token: localStorage.getItem("token") },
      });
      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchLectures() {
    console.log("Fetching lectures...");  
    try {
      const response = await axios.get(`${server}/api/lectures`, {
        headers: { token: localStorage.getItem("token") },
      });
  
      if (response.data && response.data.lectures) {
        console.log("Lectures fetched successfully:", response.data.lectures);
        setLectures(response.data.lectures);
      } else {
        console.warn("No lectures data found in response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching lectures:", error.response ? error.response.data : error.message);
    }
  }
  
  
  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: { token: localStorage.getItem("token") },
      });
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredLectures = lectures.filter(lecture => 
    lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lecture.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Layout>
  <div className="dashboard-container">
    {/* Left Side - Stats */}
    <div className="stats-container">
      <div className="box" onClick={() => setSelectedView("courses")}>
        <p>Total Courses</p>
        <p>{stats.totalCoures}</p>
      </div>
      <div className="box" onClick={() => setSelectedView("lectures")}>
        <p>Total Lectures</p>
        <p>{stats.totalLectures}</p>
      </div>
      <div className="box" onClick={() => setSelectedView("users")}>
        <p>Total Users</p>
        <p>{stats.totalUsers}</p>
      </div>
    </div>

    {/* Right Side - Table View */}
    <div className="table-section">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar"
      />

      {selectedView === "courses" && (
        <>
          <h2>All Courses</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Created By</th>
                <th>Duration</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course._id}>
                  <td>{course.title}</td>
                  <td>{course.category}</td>
                  <td>{course.createdBy}</td>
                  <td>{course.duration}</td>
                  <td>${course.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {selectedView === "lectures" && (
        <>
          <h2>All Lectures</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Video</th>
              </tr>
            </thead>
            <tbody>
              {filteredLectures.map((lecture) => (
                <tr key={lecture._id}>
                  <td>{lecture.title}</td>
                  <td>{lecture.description}</td>
                  <td>
                    <a href={lecture.video} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {selectedView === "users" && (
        <>
          <div className="users-header">
            <h2>All Users</h2>
            <button onClick={() => navigate("/adduser")} className="add-user-btn">
              Add User
            </button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  </div>
</Layout>

  );  
}

export default AdminDashboard;
