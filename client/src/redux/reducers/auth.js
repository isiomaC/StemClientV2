import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    ACCOUNT_DELETED,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    LOG_OUT,
    CLEAR_USER,
    AUTH_ERROR,
    RESET_PASSWORD_EMAIL_SENT,
    RESET_PASSWORD_EMAIL_SENT_ERROR,
    RESET_PASSWORD_FINISH,
    RESET_PASSWORD_FINISH_ERROR
} from '../actions/types'

import { encrypt } from '../../utils/cryptoWrapper'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null
}

export default function(state = initialState, action){
    const {type, payload} = action 

    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', encrypt(payload.jwtToken))
            return {
                ...state,
                user: payload.user,
                token: payload.jwtToken,
                isAuthenticated: true,
                loading: false,
                error: null
            }
        case REGISTER_SUCCESS: 
            localStorage.setItem('token', encrypt(payload.jwtToken));
            return {
                ...state,
                user: payload.user,
                token: payload.jwtToken,
                isAuthenticated: true,
                loading: false,
                error: null
            }
        case USER_LOADED:
            return {
                ...state, 
                user: payload,
                isAuthenticated: true,
                loading: false,
                error: null
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                user: payload,
                error: payload
            }
            // return state;
        case LOGIN_FAIL:
            return{
                ...state,
                isAuthenticated: false,
                loading: false,
                user: payload,
                error: payload
            }
        case CLEAR_USER: {
            return {
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: null
            }
        }
        case LOG_OUT:
            localStorage.clear()
            // localStorage.removeItem('token');
            return state;
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null
            };
        default:
            return state;
    }
}
