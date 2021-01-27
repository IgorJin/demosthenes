import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import Dashboard from "../../images/dashboard/dashboard.svg";
import Meetings from "../../images/dashboard/meetings.svg";
import Contacts from "../../images/dashboard/contacts.svg";
import Settings from "../../images/dashboard/comments.svg";
import "./index.scss";
import { connect } from "react-redux";
const cn = require("classnames");

const Sidebar = ({ userInfo }) => {
  const [pathName, setPathName] = useState("");
  useEffect(() => {
    setPathName(window.location.pathname.replace("/", ""));
  });

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h1>SaaS</h1>
      </div>
      <div className="sidebar__inner">
        {/* <div className="sidebar__avatar">
          <div className="avatar--sidebar-profile">
            <Avatar size="large" />
          </div>
          <div className="sidebar__avatar__info sidebar__hide">
            <p className="name">{userInfo.displayName}</p>
            <p className="email">{userInfo.email}</p>
          </div>
        </div> */}
        <ul className="sidebar__links">
          <li>
            <Link to="/" className={`${pathName == "" ? "active" : ""}`}>
              <Meetings />
              <span className="sidebar__hide">Meetings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className={`${pathName == "dashboard" ? "active" : ""}`}
            >
              <Dashboard />
              <span className="sidebar__hide">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/contacts"
              className={`${pathName == "contacts" ? "active" : ""}`}
            >
              <Contacts />
              <span className="sidebar__hide">Contacts</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`${pathName == "settings" ? "active" : ""}`}
            >
              <Settings />
              <span className="sidebar__hide">Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.authReducer.currentUser,
});
export default connect(mapStateToProps)(Sidebar);
