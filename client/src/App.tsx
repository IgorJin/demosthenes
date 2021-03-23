import React, { FunctionComponent, useState, useEffect } from "react";
import './App.scss';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import { connect } from 'react-redux'

import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content';

import CabinetLoginPage from './components/CabinetLoginPage';
import Meeting from './meeting';
import routes from './routes'
const cn = require('classnames');

interface Props {
  isLoginIn: boolean;
}

const App: FunctionComponent<Props> = (props) => {
  const { isLoginIn } = props;
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [pageIsLoaded, setPageIsLoaded] = useState(false);
  console.log("pageIsLoaded", pageIsLoaded, showAuthForm)

  useEffect(() => {
    setPageIsLoaded(true);
  });

  useEffect(() => {
    setShowAuthForm(!isLoginIn);
  }, [isLoginIn])

  const isMeeting = useRouteMatch('/meeting');
  //TODO create Content component
  return (
    <div className='App'>
      {isMeeting ? <Meeting /> : undefined}
      {/* {showAuthForm && pageIsLoaded ? <CabinetLoginPage /> : undefined} */}
      <main className='main'>
        <Sidebar />
        {!isLoginIn && <Redirect to="/" />}
        <Content>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </Content>


      </main>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  isLoginIn: state.authReducer.isLogin
})

export default connect(mapStateToProps)(App);
