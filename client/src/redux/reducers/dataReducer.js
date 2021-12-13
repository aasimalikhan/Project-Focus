import ACTIONS from '../actions/'

const days_accessed = []

const dataReducer = (state = days_accessed, action) => {
    switch(action.type){
        case ACTIONS.GET_USER_DAYS:
            return action.payload
        default:
            return state
    }
}


export default dataReducer 