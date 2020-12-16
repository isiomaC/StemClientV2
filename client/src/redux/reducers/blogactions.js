import {
    GET_BLOG,
    GET_BLOGS,
    BLOG_ERROR,
    SET_LOADING,
} from '../actions/types'

const initialState = {
    blogs: null,
    blog: null,
    error: null,
    loading: false
}

export default function(state=initialState, action){

    const {type, payload} = action

    switch(type){

        case GET_BLOGS:
            return {
                ...state,
                blogs : payload
            }
        case GET_BLOG: 
            return {
                ...state,
                blog: payload
            }

        case BLOG_ERROR:
            return {
                ...state,
                error: payload
            }
        case SET_LOADING: 
            return {
                ...state,
                loading: payload
            }
        default:
            return state;
    }
}