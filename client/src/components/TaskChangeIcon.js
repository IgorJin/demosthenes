import React from 'react';
const TaskChangeIcon = ({type}) => {
    return (
        <span className={`changeTaskIcon changeTaskIcon__${type}`}></span>
    )
   
}
export default TaskChangeIcon;