import React from "react";
import { Outlet } from "react-router-dom";
import { SideNavBar } from "../../components";
import "./styles.css";

export const Home = () => {
  return (
    <div className="no-gutters my-home-container">
      <div className="row no-gutters h-100">
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
