import {
    GET_PRODUCT,
    SET_LOADING
} from '../actions/types'

const initialState = {
    product: null,
    loading: true
}

export default function(state=initialState, action){
    const {type, payload} = action

    switch(type){
        case GET_PRODUCT:
            return {
                ...state,
                product: payload,
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