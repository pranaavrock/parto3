import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "./common.css";

const Layout = ({ children }) => {
  return (
    <div className="dashboard-admin">
      <Sidebar />
      <div className="content1">
        {children}  {/* ✅ Works because now we explicitly pass children */}
      </div>  
    </div>
  );
};

export default Layout;

