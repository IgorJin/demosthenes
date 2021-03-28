import React, { FunctionComponent, useState, useEffect } from "react";
import './App.scss';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import { connect } from 'react-redux'

import Dashboard from './containers/Dashboard';

import CabinetLoginPage from './containers/CabinetLoginPage';
import EventPage from './pages/event-page';
import routes from './routes'
import { Provider as SocketProvider } from "./lib/context/socket"
import { Provider as VideoProvider } from "./lib/context/video"

import cn from 'classnames';

interface Props {
  isLoginIn: boolean;
}

const App: FunctionComponent<Props> = (props) => {
  const { isLoginIn } = props;
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [pageIsLoaded, setPageIsLoaded] = useState(false);

  useEffect(() => {
    setPageIsLoaded(true);
  });

  useEffect(() => {
    setShowAuthForm(!isLoginIn);
  }, [isLoginIn])

  const checkAuth = () => showAuthForm ? <Redirect to="/login" /> : <Redirect to="/dashboard/events" />

  return (
    <div className='App'>
      <Switch>
        <Route exact path="/">
          {checkAuth()}
        </Route>
        <Route path="/e/:eventId">
          <SocketProvider>
            <VideoProvider>
              <EventPage />
            </VideoProvider>
          </SocketProvider>
        </Route>
        <Route path="/dashboard">
          <Dashboard>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  children={<route.main />}
                />
              ))}
            </Switch>
          </Dashboard>
        </Route>
        <Route path="/login"><CabinetLoginPage /></Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  isLoginIn: state.authReducer.isLogin
})

export default connect(mapStateToProps)(App);
