import React, { FunctionComponent, Children } from "react";
import "./index.scss"

interface Props {
  type: "main-full" | "main-half" | "sub-half" | "sub-quater"
 }

const Block: FunctionComponent<Props> = (props) => {
  const { type, children } = props;
  
  return (
    <div className={type}>
      {children}
    </div>
  );
};
export default Block;
