import React, { FunctionComponent, useEffect, useContext, useState } from "react";
import Block from "../../Dashboard/block";
import Avatar from "../../../components/Avatar"
// import cn from "classnames"; @types/classnames
import "../index.scss"

interface Props {

}

const MainHeader: FunctionComponent<Props> = (props) => {
  const { } = props;

  return (
    <div className="content__header">
      <Block type="main-half" />

      <Block type="main-half">
        <div className="search-block">

        </div>
        <div className="profiles">
          <div className="notifications-block">
            <span>notif</span>
          </div>
          <div className="profile-block">
            <div className="avatar--sidebar-profile">
              <Avatar size="large" />
            </div>
          </div>
        </div>

      </Block>
    </div>
  );
}

export default MainHeader;