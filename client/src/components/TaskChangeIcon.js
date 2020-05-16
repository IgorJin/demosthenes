import React from './node_modules/react';
const TaskChangeIcon = ({type}) => {
    return (
        <span className={`changeTaskIcon changeTaskIcon__${type}`}></span>
    )
   
}
export default TaskChangeIcon;