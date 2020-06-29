import React from 'react';
const RoomButton = ({color, children, onClick}) => {
    return (
        <div className='room_button' onClick={onClick}>
            <span className={`room_button__button room_button__button--${color}`}>{children}</span>
        </div>
    )
   
}
export default RoomButton;