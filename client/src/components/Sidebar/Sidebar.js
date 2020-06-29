import React from 'react';
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import ToggleSidebarButton from './ToggleSidebarButton'
import Avatar from '../Avatar'
import dashboard from '../../images/dashboard.svg';
import room from '../../images/room.svg';
import contacts from '../../images/contacts.svg';
import settings from '../../images/settings.svg';
import './index.scss'
const cn = require('classnames');

const Sidebar = ({sidebarState, onToggleSidebar}) => {  
    const sidebarStyle = cn('sidebar', {'sidebar--close': sidebarState})
    return (
        <div className={sidebarStyle}>
        <div className='sidebar__top'>
          <h1>SaaS</h1> <h1 className='sidebar__hide'>Kit</h1> 
        </div>
        <div className='sidebar__inner'>
          <div className='sidebar__avatar'>
            <div className='avatar--sidebar-profile'>
              <Avatar size='large' />
            </div>
            <div className='sidebar__avatar__info sidebar__hide'>
                <p className='name'>Sierra Ferguson</p>
                <p className='email'>s.ferguson@gmail.com</p>
            </div>
          </div>
          <ul className='sidebar__links'>
            <li>
              <Link to='/'><img src={room}></img> <span className='sidebar__hide'>Rooms</span></Link>
            </li>
            <li>
              <Link to='/dashboard'><img src={dashboard}></img> <span className='sidebar__hide'>Dashboard</span></Link>
            </li>
            <li>
              <Link to='/contacts'><img src={contacts}></img><span className='sidebar__hide'>Contacts</span></Link>
            </li>
          </ul>
        </div>
        <div className='sidebar__footer'>
        <ul className='sidebar__links'>
            <li>
              <Link to='/settings'><img src={settings}></img> <span className='sidebar__hide'>Settings</span></Link>
            </li>
            <ToggleSidebarButton onClick={onToggleSidebar}/>
          </ul>
        </div>
      </div>
    )
   
}
export default Sidebar;