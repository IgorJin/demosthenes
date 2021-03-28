import React, { FunctionComponent, useEffect, useContext, useState } from "react";
import MainHeader from './MainHeader';
import Sidebar from '../Sidebar/Sidebar';
import cn from "classnames";
import "./index.scss";


interface Props {

}

const Content: FunctionComponent<Props> = (props) => {
  const {children} = props;

  return (
    <main className='main'>
    <Sidebar />   
    <div className='content'>
      <MainHeader />
      <div className="content-wrapper">
        {children}
      </div>
    </div>
    </main>
  );
}

export default Content;