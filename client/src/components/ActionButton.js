import React from './node_modules/react';
const ActionButton = ({ children }) => {
    return (
        <div className='actionButton'>
            <span className='actionButton__button'>{children}</span>
        </div>
    )
   
}
export default ActionButton;