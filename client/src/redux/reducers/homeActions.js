import {
    LOG_OUT,
    GET_PRODUCTS,
    GET_FEATURED_PRODUCTS,
    GET_REVIEWS,
    SET_LOADING,
    GET_EXTRAS,
    SEARCH_PRODUCTS,
    GET_PRODUCT_BY_PRICE,
    GET_HIGHEST_PRICE, 
    GET_NEW_PRODUCTS,
    GET_PRODUCT_BY_CATEGORY,
    EXTRAS_ERROR,
    REVIEWS_ERROR,
    GET_ALL_ERROR
} from '../actions/types'

const initialState = {
    loading: true,
    error: {},
    reviews: [],
    featured_products: [],
    products: [],
    extras: [],
    max: 0
}

export default function(state = initialState, action){
    const {type, payload} = action 

    switch (type) {
        case GET_FEATURED_PRODUCTS:
            return {
                ...state,
                featured_products: payload,
            }
        case GET_PRODUCTS: 
            //localStorage.setItem('token', payload.token);
            return {
                ...state,
                products: payload,
            }
        case SEARCH_PRODUCTS:
            return {
                ...state,
                products: payload
            }
        case GET_PRODUCT_BY_PRICE:
            return {
                ...state, 
                products: payload
            }
        case GET_PRODUCT_BY_CATEGORY:
            return {
                ...state, 
                products: payload
            }
        case GET_HIGHEST_PRICE:
            return {
                ...state, 
                max: payload.price
            }
        case GET_NEW_PRODUCTS:
            return {
                ...state,
                products: payload
            }
        case GET_REVIEWS:
            return {
                ...state, 
                reviews: payload,
            }
        case REVIEWS_ERROR:
            return {
                ...state, 
                error: payload
        }
        case GET_EXTRAS:{
            return{
                ...state,
                extras: payload,
            }
        }
        case GET_ALL_ERROR:{
            return{
                ...state,
                error: payload,
            }
        }
        case EXTRAS_ERROR:
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
        case LOG_OUT:
            localStorage.removeItem('token');
            return state;
        // case ACCOUNT_DELETED:
        //     localStorage.removeItem('token');
        //     return {
        //     ...state,
        //     token: null,
        //     isAuthenticated: false,
        //     loading: false
        //     }; 
        default:
            return state;
    }
}
