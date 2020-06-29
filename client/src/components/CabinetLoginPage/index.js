import React, { useState, useEffect, Fragment } from 'react';
import { registerPostFetch, authPostFetch, loginPostFetch } from '../../actions'
import { connect } from 'react-redux'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import './auth.scss'

const CabinetLoginPage = ({ registerPostFetch, loginPostFetch, authPostFetch, isLoginIn }) => {
    const [isReg, setIsReg] = useState(false)
    useEffect(() => {
        authPostFetch()//проверка jwt
    }, [])

    function RegisterSubmit(e, username, email, password) {
        e.preventDefault()
        registerPostFetch({ username, password, email })
    }
    function LoginSubmit(e, email, password) {
        e.preventDefault()
        loginPostFetch({ email, password })
    }

    return (
        <Fragment>
            <div className='auth_page_bg' />
            <div className='auth_page__form'>
                {
                    !isReg ?
                        <Fragment>
                            <LoginPage handleSubmit={LoginSubmit} />
                            <span className='auth_page__form__link' onClick={()=>setIsReg(true)}>Sign Up</span>
                        </Fragment>
                        :
                        <Fragment>
                            <RegisterPage handleSubmit={RegisterSubmit} />
                            <span className='auth_page__form__link' onClick={()=>setIsReg(false)}>Sign In</span>
                        </Fragment>
                }
            </div>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => ({
    registerPostFetch: userInfo => dispatch(registerPostFetch(userInfo)),
    loginPostFetch: userInfo => dispatch(loginPostFetch(userInfo)),
    authPostFetch: () => dispatch(authPostFetch()),
})

const mapStateToProps = state => ({
    isLoginIn: state.authReducer.isLogin
})

export default connect(mapStateToProps, mapDispatchToProps)(CabinetLoginPage);