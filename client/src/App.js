import React, {useState, useEffect} from './node_modules/react';
import profilelogo from './profile.svg';
import './App.scss';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "./node_modules/react-router-dom";
//import Sidebar from './components/' 
import Dashboard from './components/Dashboard'
import Contacts from './components/Contacts'
import Settings from './components/Settings'
import Search from './components/Search'
import ToggleSidebarButton from './components/ToggleSidebarButton'
import Avatar from './components/Avatar'
import dashboard from './dashboard.svg';
import contacts from './contacts.svg';
import settings from './settings.svg';
import api from './services';
const cn = require('./node_modules/classnames');

function App() {
  const [sidebarState, SetSidebarState] = useState(false)
  const [task, setTasks] = useState([])
  const [contacts, setContacts] = useState([])
  const [data, setData] = useState({})

  const routes = [
    {
      path: "/",
      exact: true,
      main: Dashboard,
    },
    {
      path: "/contacts",
      main: Contacts,
    },
    {
      path: "/settings",
      main: Settings,
    },
  ]
  const toggleSidebar = () => {
    SetSidebarState(!sidebarState)
  }
  const sidebarStyle = cn('sidebar', {'sidebar--close': sidebarState})

  useEffect(()=>{
    api.getTask().then((res)=> 
      res.json()).then(d => {
      console.log(d)
      setTasks(d)
      setData({'task' : d})
    })
  }, [])
  return (
    <div className='App'>
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
              <Link to='/'><img src={dashboard}></img> <span className='sidebar__hide'>Dashboard</span></Link>
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
            <ToggleSidebarButton onClick={toggleSidebar}/>
          </ul>
        </div>
      </div>
      <div className='main'>
        <Search />
        <div className='content'>
          <div className='content__inner'>
          
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.main data ={data}/>}
                />
              ))}
            </Switch>
          </div>
          
        </div>
      </div>
      {/* <Sidebar />
      
      <Content /> */}
    </div>
  );
}

export default App;
