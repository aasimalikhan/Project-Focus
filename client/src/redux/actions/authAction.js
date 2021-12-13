import ACTIONS from './index'
import axios from 'axios'

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

//Gets details of the user which is returned by the url
export const fetchUser = async (token) => { //gets the details of the logged in user if the token is correct
    const res = await axios.get('/user/infor', {
        headers: {Authorization: token}
    })
    return res;
}

export const fetchAllPomodoros = async (token) => {
    const res = await axios.get('/user/pomodoros', {
        headers: {Authorization: token}
    })
    return res;
}



export const fetchDaysAccessed = async (token) => {
    const res = await axios.get('/user/days_accessed', {
        headers: {
            Authorization: token
        }
    })

    return res;
}

//Gets the current user data and adds to state
export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.role === 1 ? true : false
        }
    }
}

export const dispatchGetPomodoros = (res) => {
    return {
        type: ACTIONS.GET_USER_POMODOROS,
        payload: res
    }
}

export const dispatchGetDays = (res) => {
    return {
        type: ACTIONS.GET_USER_DAYS,
        payload: res
    }
}

//Gets the token value and adds to state
export const getTokenValue = (res) => {
    return {
        type: ACTIONS.GET_TOKEN,
        payload: res.data.access_token
    }
}

