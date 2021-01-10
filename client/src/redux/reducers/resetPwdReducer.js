import {
    RESET_PASSWORD_EMAIL_SENT,
    RESET_PASSWORD_EMAIL_SENT_ERROR,
    RESET_PASSWORD_FINISH,
    RESET_PASSWORD_FINISH_ERROR
} from '../actions/types'

const initialState = {
    resetPwdStart: null,
    resetPwdFinish: null,
}

export default function(state = initialState, action){
    const {type, payload} = action 

    switch (type) {
        case RESET_PASSWORD_EMAIL_SENT:
            return {
                ...state,
                resetPwdStart: payload
            }
        case RESET_PASSWORD_FINISH: 
            return {
                ...state,
                resetPwdFinish: payload
            }
        case RESET_PASSWORD_EMAIL_SENT_ERROR: 
            return {
                ...state,
                resetPwdStart: payload
            }
        case RESET_PASSWORD_FINISH_ERROR: 
            return {
                ...state,
                resetPwdFinish: payload
            }
        default:
            return state
    }
}