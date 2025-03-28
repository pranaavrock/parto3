// import React from "react";
// import "./common.css";
// import { Link } from "react-router-dom";
// import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
// import { FaBook, FaUserAlt } from "react-icons/fa";
// import { UserData } from "../../context/UserContext";

// const Sidebar = () => {
//   const { user } = UserData();
//   return (
//     <div className="sidebar">
//       <ul>
//         <li>
//           <Link to={"/admin/dashboard"}>
//             <div className="icon">
//               <AiFillHome />
//             </div>
//             <span>Home</span>
//           </Link>
//         </li>

//         <li>
//           <Link to={"/admin/course"}>
//             <div className="icon">
//               <FaBook />
//             </div>
//             <span>Courses</span>
//           </Link>
//         </li>

//         {user && user.mainrole === "superadmin" && (
//           <li>
//             <Link to={"/admin/users"}>
//               <div className="icon">
//                 <FaUserAlt />
//               </div>
//               <span>Users</span>
//             </Link>
//           </li>
//         )}

//         <li>
//           <Link to={"/account"}>
//             <div className="icon">
//               <AiOutlineLogout />
//             </div>
//             <span>Exit</span>
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import "./common.css";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { UserData } from "../../context/UserContext";

const Sidebar = () => {
  const { user } = UserData();

  const menuItems = [
    { path: "/admin/dashboard", label: "Home", icon: <AiFillHome /> },
    { path: "/admin/course", label: "Courses", icon: <FaBook /> },
    { path: user ? `/admin/profile/${user._id}` : "/admin/profile", label: "Profile", icon: <FaUserAlt /> },
  ];


  menuItems.push({ path: "/account", label: "Exit", icon: <AiOutlineLogout /> });

  return (
    <div className="sidebar">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink to={item.path} activeClassName="active">
              <div className="sidebar__icon">{item.icon}</div>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
