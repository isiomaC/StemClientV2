import {
    GET_REVIEWS_FOR_PRODUCT,
    REVIEWS_ERROR,
    SET_LOADING
} from '../actions/types'

const initialState = {
    reviews: [],
    error: null,
    loading: false
}

export default function(state = initialState, action){
    const {type, payload} = action 

    switch (type) {
        case GET_REVIEWS_FOR_PRODUCT:
            return {
                ...state,
                reviews: payload
            }
        case REVIEWS_ERROR:
            return {
                ...state,
                error: payload
            }
        case SET_LOADING:{
            return {
                ...state,
                loading: payload
            }
        }
        default:
            return state
    }
}