import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Dashboard } from "../../images/dashboard/dashboard.svg";
import { ReactComponent as Meetings } from "../../images/dashboard/meetings.svg";
import { ReactComponent as Contacts } from "../../images/dashboard/contacts.svg";
import { ReactComponent as Settings } from "../../images/dashboard/comments.svg";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";

const dashboardLinks = [
  {
    title: "Events",
    path: "dashboard/events",
    icon: <Meetings />,
  },
  {
    title: "Workspace",
    path: "dashboard/workspace",
    icon: <Dashboard />,
  },
  {
    title: "Contacts",
    path: "dashboard/contacts",
    icon: <Contacts />,
  },
  {
    title: "Settings",
    path: "dashboard/settings",
    icon: <Settings />,
  },
];

const Sidebar = (props) => {
  const [pathName, setPathName] = useState("");

  const userInfo = useSelector((state) => state.authReducer.currentUser);

  useEffect(() => {
    setPathName(window.location.pathname.replace("/", ""));
  });

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div>Demosthenes</div>
      </div>
      <div className="sidebar__inner">
        <div className="sidebar__links">
          {dashboardLinks.map((link) => (
            <Link
              to={`/${link.path}`}
              className={`${pathName == link.path ? "active" : ""}`}
            >
              <div className="sidebar__links__icon">{link.icon}</div>
              <span className="sidebar__hide">{link.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
