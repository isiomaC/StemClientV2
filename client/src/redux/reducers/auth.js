import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    ACCOUNT_DELETED,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    LOG_OUT,
    CLEAR_USER,
    AUTH_ERROR
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialState, action){
    const {type, payload} = action 

    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.jwtToken);
            return {
                ...state,
                user: payload.user,
                token: payload.jwtToken,
                isAuthenticated: true,
                loading: false,
            }
        case REGISTER_SUCCESS: 
            localStorage.setItem('token', payload.jwtToken);
            return {
                ...state,
                user: payload.user,
                token: payload.jwtToken,
                isAuthenticated: true,
                loading: false,
            }
        case USER_LOADED:
            return {
                ...state, 
                user: payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
            // return state;
        case LOGIN_FAIL:
            return{
                ...state,
                isAuthenticated: false,
                loading: false,
                user: payload
            }
        case CLEAR_USER: {
            return {
                ...state, 
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        }
        case LOG_OUT:
            localStorage.removeItem('token');
            return state;
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
            }; 
        default:
            return state;
    }
}
