import React, { FunctionComponent, useEffect, useContext, useState } from "react";
import MainHeader from './MainHeader';
// import cn from "classnames"; @types/classnames
import "./index.scss";


interface Props {

}

const Content: FunctionComponent<Props> = (props) => {
  const {children} = props;

  return (
    <div className='content'>
      <MainHeader />

      <div className="content-wrapper">
        {children}
      </div>
    </div>
  );
}

export default Content;