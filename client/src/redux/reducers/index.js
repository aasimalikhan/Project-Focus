import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import pomodoro from './pomodoroReducer'
import data from './dataReducer'


export default combineReducers({
    auth,
    token,
    users,
    pomodoro,
    data
})