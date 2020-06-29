import { combineReducers } from 'redux'
import authReducer from './authReducer'
import webinarReducer from './webinarReducer'

export default combineReducers({
    authReducer,
    webinarReducer
})