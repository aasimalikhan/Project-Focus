import ACTIONS from './index'
import axios from 'axios'

export const fetchAllUsers = async (token) => { //gets the details of the logged in user if the token is correct
    const res = await axios.get('/user/all_infor', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetAllUsers = (res) => {
    return {
        type: ACTIONS.GET_ALL_USERS,
        payload: res.data
    }
}

