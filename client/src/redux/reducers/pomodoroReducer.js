import ACTIONS from '../actions/'

const pomodoros = []

const pomodoroReducer = (state = pomodoros, action) => {
    switch(action.type){
        case ACTIONS.GET_USER_POMODOROS:
            return action.payload
        default:
            return state
    }
}


export default pomodoroReducer 