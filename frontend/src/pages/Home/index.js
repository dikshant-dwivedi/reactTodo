import React from "react";
import { Outlet } from "react-router-dom";
import { SideNavBar } from "../../components";
import "./styles.css";

export const Home = () => {
  return (
    <div className="no-gutters my-container">
      <div className="row h-100 no-gutters">
        <div className="col-sm col-md-2">
          <SideNavBar />
        </div>
        <div className="col-sm col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
