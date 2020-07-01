import React from 'react';
const ToggleSidebarButton = ({isActive, onClick}) => {
    return (
        <span className='toggleSidebar' onClick={onClick}>
            <span className={`toggleSidebar_icon ${isActive ? 'active': ''}`}></span> <span className='toggleSidebar__text sidebar__hide'>Toggle sidebar</span>
        </span>
    )
}
export default ToggleSidebarButton;