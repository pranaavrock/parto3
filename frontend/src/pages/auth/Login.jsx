// import React, { useState } from "react";
// import "./auth.css";
// import { Link, useNavigate } from "react-router-dom";
// import { UserData } from "../../context/UserContext";
// import { CourseData } from "../../context/CourseContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const { btnLoading, loginUser } = UserData();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { fetchMyCourse } = CourseData();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     await loginUser(email, password, navigate, fetchMyCourse);
//   };
//   return (
//     <div className="auth-page">
//       <div className="auth-form">
//         <h2>Login</h2>
//         <form onSubmit={submitHandler}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button disabled={btnLoading} type="submit" className="common-btn">
//             {btnLoading ? "Please Wait..." : "Login"}
//           </button>
//         </form>
//         <p>
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//         <p>
//           <Link to="/forgot">Forgot password?</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchMyCourse } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  };

  return (
    <motion.div 
      className="auth-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="auth-form"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          <motion.label htmlFor="email" whileHover={{ scale: 1.05 }}>Email</motion.label>
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            whileFocus={{ borderColor: "#007bff" }}
          />

          <motion.label htmlFor="password" whileHover={{ scale: 1.05 }}>Password</motion.label>
          <motion.input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            whileFocus={{ borderColor: "#007bff" }}
          />

          <motion.button 
            disabled={btnLoading} 
            type="submit" 
            className="common-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {btnLoading ? "Please Wait..." : "Login"}
          </motion.button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <p>
          <Link to="/forgot">Forgot password?</Link>
        </p>
        <div className="admin-option">
        <p>Admin? <Link to="/adminLogin">Login here</Link></p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
