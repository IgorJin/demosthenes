import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { Provider as SocketProvider } from "./lib/context/socket"
import { Provider as VideoProvider } from "./lib/context/video"

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    //(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
)

ReactDOM.render(
  <Provider store={store}>
    <SocketProvider>
      <VideoProvider>
        <Router>
          <App />
        </Router>
      </VideoProvider>
    </SocketProvider>
  </Provider>,
  document.getElementById('root')
);

