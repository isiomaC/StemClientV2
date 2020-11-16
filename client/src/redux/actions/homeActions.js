import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PRODUCTS,
  GET_FEATURED_PRODUCTS,
  GET_REVIEWS,
  SET_LOADING,
  GET_EXTRAS,
  CUSTOMER_ERROR,
  PRODUCT_ERROR, 
  DELETE_ACCOUNT,
  SEARCH_PRODUCTS,
  GET_PRODUCT_BY_PRICE,
  GET_HIGHEST_PRICE,
  GET_PRODUCT_BY_CATEGORY,
  GET_NEW_PRODUCTS, 
  EXTRAS_ERROR,
  REVIEWS_ERROR
} from './types';
import setAuthToken from '../../utils/setAuthToken';


export const getProducts = () => async dispatch => {
    // if(localStorage.token){
    //     setAuthToken(localStorage.token)
    // }
    
    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })
        
        const res = await axios.get('/api/products')
        // console.log(res.data)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_PRODUCTS, 
            payload: res.data
        })

    }catch(err){
        dispatch({
            type: SET_LOADING,
            payload: false
        })
        dispatch({
            type:  PRODUCT_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status 
            }
        })
    }
} 

export const searchProducts = (text) => async dispatch => {

    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })
    
        let res = await axios.get(`/api/products?filter={"q":${JSON.stringify(text)}}&range=[0,19]&sort=["date","ASC"]`)
        // console.log(res.data)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: SEARCH_PRODUCTS,
            payload: res.data
        })
        
    }catch(err){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: PRODUCT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
} 

export const getProductByPrice = (price) => async dispatch => {
    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        let res = await axios.get(`/api/products?filter={"price": ${JSON.stringify(price)}}&range=[0,19]&sort=["date","ASC"]`)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_PRODUCT_BY_PRICE,
            payload: res.data
        })

    }catch(err){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: PRODUCT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
} 

export const getByCategory = (name) => async dispatch => {

    try{
        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get(`/api/products?filter={"category_name": ${JSON.stringify(name)}}`)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_PRODUCT_BY_CATEGORY,
            payload: res.data
        })

    }catch(err){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: PRODUCT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const getNewProducts = () => async dispatch => {

    try{
        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get(`/api/products?filter={"new": "date"}`)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_PRODUCT_BY_CATEGORY,
            payload: res.data
        })

    }catch(err){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: PRODUCT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const getHighestPrice =() => async dispatch => {
    try{

        const res = await axios.get(`/api/products?filter={"getHighest":"price"}`)

        dispatch({
            type: GET_HIGHEST_PRICE,
            payload: res.data
        })

    }catch(err){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: PRODUCT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const getFeaturedProducts = () =>  async dispatch => {

    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        //?filter={"featured":"date"}
        const res = await axios.get('/api/products')

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_FEATURED_PRODUCTS,
            payload: res.data.slice(0, 6)
        })

    }catch(err){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: PRODUCT_ERROR,
            payload: {
                resource: 'FeaturedProducts',
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }

}


export const getReviews = () => async dispatch => {
    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get('/api/reviews')

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_REVIEWS,
            payload: res.data
        })
        
    }catch(error){

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: REVIEWS_ERROR,
            payload: {
                resource: 'Reviews',
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const getExtras = () => async dispatch => {

    try {

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get('/api/extra')

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_EXTRAS,
            payload: res.data
        })

    }catch(error){

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: EXTRAS_ERROR,
            payload: {
                resource: 'Extras',
                msg: error.response.statusText,
                status: error.response.status
            }
        })    
    }
}

export const GetAll = () => async dispatch => {
    try {

        

    }catch(error){
        dispatch({
            type: PRODUCT_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const deleteAccount = () => async dispatch => {
    dispatch({
        type: DELETE_ACCOUNT
    })
}