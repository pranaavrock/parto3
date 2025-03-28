import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = ({ isAuth }) => {
  return (
    <header className="stylish-header">
      <div className="logo">
        <span className="logo-icon">🎓</span> E-Learning
      </div>

      <nav className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/courses" className="nav-link">
          Courses
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        {isAuth ? (
          <Link to="/account" className="nav-link account-link">
            Account
          </Link>
        ) : (
          <Link to="/login" className="nav-link login-link">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;