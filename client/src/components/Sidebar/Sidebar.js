import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import ToggleSidebarButton from './ToggleSidebarButton'
import Avatar from '../Avatar'
import dashboard from '../../images/dashboard.svg';
import room from '../../images/room.svg';
import contacts from '../../images/contacts.svg';
import settings from '../../images/settings.svg';
import './index.scss'
import { connect } from 'react-redux'
const cn = require('classnames');

const Sidebar = ({sidebarState, onToggleSidebar, userInfo}) => {  
  const [pathName, setPathName] = useState('')
  useEffect(()=>{
    setPathName(window.location.pathname.replace('/', ''))
  }
  )
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
                <p className='name'>{userInfo.displayName}</p>
                <p className='email'>{userInfo.email}</p>
            </div>
          </div>
          <ul className='sidebar__links'>
            <li>
              <Link to='/' className={`${pathName == ''?'active' :''}`}><img src={room}></img> <span className='sidebar__hide'>Rooms</span></Link>
            </li>
            <li>
              <Link to='/dashboard'  className={`${pathName == 'dashboard'?'active' :''}`}><img src={dashboard}></img> <span className='sidebar__hide'>Dashboard</span></Link>
            </li>
            <li>
              <Link to='/contacts'  className={`${pathName == 'contacts'?'active' :''}`}><img src={contacts}></img><span className='sidebar__hide'>Contacts</span></Link>
            </li>
          </ul>
        </div>
        <div className='sidebar__footer'>
        <ul className='sidebar__links'>
            <li>
              <Link to='/settings'  className={`${pathName == 'settings'?'active' :''}`}><img src={settings}></img> <span className='sidebar__hide'>Settings</span></Link>
            </li>
            <ToggleSidebarButton isActive={sidebarState} onClick={onToggleSidebar}/>
          </ul>
        </div>
      </div>
    )
   
}
const mapStateToProps = state =>({
  userInfo: state.authReducer.currentUser
})
export default connect(mapStateToProps)(Sidebar);