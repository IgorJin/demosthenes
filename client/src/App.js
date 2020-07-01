import React, {useState, useEffect} from 'react';
import './App.scss';
import {
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { connect } from 'react-redux'

import Search from './components/Search'
import api from './services';
import Sidebar from './components/Sidebar/Sidebar';
import CabinetLoginPage from './components/CabinetLoginPage';
import Webinar from './Webinar/Comnponents';
import routes from './routes'
const cn = require('classnames');

function App({isLoginIn}) {
  const [sidebarState, setSidebarState] = useState(false)
  const toggleSidebar = () => {
    setSidebarState(!sidebarState)
  }
  if (useRouteMatch('/webinar')) return <Webinar />
  return (
    <div className='App'>
      {
        !isLoginIn &&
        <CabinetLoginPage /> 
      }
      <Sidebar 
        sidebarState = {sidebarState}
        onToggleSidebar ={toggleSidebar}
       />
      <div className='main'>
        <Search />
          <div className='content'>
            <div className='content__inner'>
            {!isLoginIn && <Redirect to="/" />}
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.main/>}
                  />
                ))}
              </Switch>
            </div>
          </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoginIn: state.authReducer.isLogin
})

export default connect(mapStateToProps)(App);
