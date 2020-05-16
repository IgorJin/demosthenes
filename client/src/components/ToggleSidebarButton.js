import React from './node_modules/react';
const ToggleSidebarButton = ({onClick}) => {
    return (
        <span className='toggleSidebar' onClick={onClick}>
            <span className='toggleSidebar_icon'></span> <span className='toggleSidebar__text sidebar__hide'>Toggle sidebar</span>
        </span>
    )
}
export default ToggleSidebarButton;