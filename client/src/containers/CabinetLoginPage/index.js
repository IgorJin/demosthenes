import React, {
  useState,
  useEffect,
  Fragment,
  useRef,
  useCallback,
} from "react";
import {
  registerPostFetch,
  authPostFetch,
  loginPostFetch,
  registerWithGoogleFetch,
  loginWithGoogleFetch,
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import "./auth.scss";

import firebase from "firebase/app";
import "firebase/auth";

const CabinetLoginPage = ({
  registerPostFetch,
  loginPostFetch,
  authPostFetch,
  isLoginIn,
}) => {
  const [isReg, setIsReg] = useState(false);
  const provider = useRef(new firebase.auth.GoogleAuthProvider());
  const dispatch = useDispatch();

  provider.current.setCustomParameters({
    prompt: "select_account",
  });

  useEffect(() => {
    authPostFetch();
  }, []);

  useEffect(() => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp({
        apiKey: "AIzaSyDw5zkFY2gIP4U7UJwqEy-DUcdVtclOVTI",
        authDomain: "demosthenes-project.firebaseapp.com",
        projectId: "demosthenes-project",
        storageBucket: "demosthenes-project.appspot.com",
        messagingSenderId: "554814698180",
        appId: "1:554814698180:web:9d36c2140a7608cfd54f91",
      });
    }
  }, []);

  function RegisterSubmit(e, username, email, password) {
    e.preventDefault();
    registerPostFetch({ name: username, password, email });
  }

  function LoginSubmit(e, email, password) {
    e.preventDefault();
    loginPostFetch({ email, password });
  }

  const handleClickGoogle = useCallback(async () => {
    let token;
    if (!token) {
      await firebase.auth().signInWithPopup(provider.current);
      token = await firebase.auth().currentUser?.getIdToken();
    }
    if (token) {
      if (isReg) {
        const response = registerWithGoogleFetch({ token })(dispatch);
      } else {
        const response = loginWithGoogleFetch({ token })(dispatch);
      }
    }
  }, [dispatch]);

  return (
    <Fragment>
      <div className="auth_page_bg" />
      <div className="auth_page__form">
        {!isReg ? (
          <Fragment>
            <LoginPage
              handleSubmit={LoginSubmit}
              handleClickGoogle={handleClickGoogle}
            />
            <span
              className="auth_page__form__link"
              onClick={() => setIsReg(true)}
            >
              Sign Up
            </span>
          </Fragment>
        ) : (
          <Fragment>
            <RegisterPage
              handleSubmit={RegisterSubmit}
              handleClickGoogle={handleClickGoogle}
            />
            <span
              className="auth_page__form__link"
              onClick={() => setIsReg(false)}
            >
              Sign In
            </span>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  registerPostFetch: (userInfo) => dispatch(registerPostFetch(userInfo)),
  loginPostFetch: (userInfo) => dispatch(loginPostFetch(userInfo)),
  authPostFetch: () => dispatch(authPostFetch()),
});

const mapStateToProps = (state) => ({
  isLoginIn: state.authReducer.isLogin,
});

export default connect(mapStateToProps, mapDispatchToProps)(CabinetLoginPage);
