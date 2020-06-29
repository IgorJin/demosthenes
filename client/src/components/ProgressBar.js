import React from 'react';
const ProgressBar = ({amountTasks, completedTasks}) => {
    const value = Math.ceil(completedTasks/amountTasks*100)
    return (
        <div className='progress-bar'>
            <progress value={value} max="100" />
        </div>
    )
   
}
export default ProgressBar;