import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  StatsIcon,
  ProjectsIcon,
  ChatIcon,
  CalendarIcon,
  SettingsIcon,
  LogoutIcon,
} from "../../resources/icons";
import * as ROUTES from "../../constants";
import "./styles.css";
import { useFirebaseUser } from "../../context/UserContext";

const LINKS = [
  {
    path: ROUTES.OVERVIEW,
    text: "Overview",
    svgComponent: HomeIcon,
  },
  {
    path: ROUTES.STATS,
    text: "Stats",
    svgComponent: StatsIcon,
  },
  {
    path: ROUTES.PROJECTS,
    text: "Projects",
    svgComponent: ProjectsIcon,
  },
  {
    path: ROUTES.CHAT,
    text: "Chat",
    svgComponent: ChatIcon,
  },
  {
    path: ROUTES.CALENDAR,
    text: "Calendar",
    svgComponent: CalendarIcon,
  },
];

export const SideNavBar = () => {
  const { pathname } = useLocation();
  const isSettingActive = pathname === "/" + ROUTES.SETTING;
  const { logout } = useFirebaseUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="no-gutters my-sidenavbar-container">
      <div>
        <div className="my-logo-container">
          <p className="h3 my-logo">.taskez</p>
        </div>
        <div className="my-links">
          {LINKS.map((l) => {
            const isActive = "/" + l.path === pathname;
            return (
              <div
                className="my-link-container"
                style={{ borderRight: isActive ? "4px solid #329C89" : "none" }}
              >
                <NavLink
                  to={l.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="my-link">
                    <div className="my-link-icon">
                      {<l.svgComponent isActive={isActive} />}
                    </div>
                    <p
                      className="my-link-title"
                      style={{ color: isActive ? "#212121" : "#9A9A9A" }}
                    >
                      {l.text}
                    </p>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-links-bottom">
        <div
          className="my-link-container"
          style={{
            borderRight: isSettingActive ? "4px solid #329C89" : "none",
          }}
        >
          <NavLink
            to={ROUTES.SETTING}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="my-link">
              <div className="my-link-icon">
                {<SettingsIcon isActive={isSettingActive} />}
              </div>
              <p
                className="my-link-title"
                style={{ color: isSettingActive ? "#212121" : "#9A9A9A" }}
              >
                Settings
              </p>
            </div>
          </NavLink>
        </div>
        <div className="my-link-container">
          <div onClick={handleLogout} style={{ cursor: "pointer" }}>
            <div className="my-link">
              <div className="my-link-icon">{<LogoutIcon />}</div>
              <p className="my-link-title" style={{ color: "#9A9A9A" }}>
                Log out
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
