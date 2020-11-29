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
    user: null,
    error: null
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
                error: null
            }
        case REGISTER_SUCCESS: 
            localStorage.setItem('token', payload.jwtToken);
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
            localStorage.removeItem('token');
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
