import { combineReducers } from 'redux'
import authReducer from './authReducer'
import meetingReducer from './meetingReducer'

export default combineReducers({
    authReducer,
    meetingReducer
})