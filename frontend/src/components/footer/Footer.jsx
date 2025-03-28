import React from "react";
import "./footer.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2025 Your E-Learning Platform. All rights reserved. <br /> 
          Made by <strong>TEAM_TEK</strong>
        </p>
        <div className="social-links">
          <a href="#" aria-label="Facebook">
            <AiFillFacebook />
          </a>
          <a href="#" aria-label="Twitter">
            <AiFillTwitterSquare />
          </a>
          <a href="https://www.instagram.com/teamtek2025?igsh=MW9vNTQzeWowN2JmaA==" aria-label="Instagram">
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
