import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PRODUCTS,
  GET_FEATURED_PRODUCTS,
  GET_REVIEWS,
  SET_LOADING,
  GET_EXTRAS,
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

import setDispatchError from '../../utils/setDispatchError'


// const apiUrl ="https://inphinityapi.herokuapp.com/api"
const apiUrl =process.env.REACT_APP_API_URL
// const apiUrl = 'https://shrouded-hollows-95980.herokuapp.com/api'


export const getProducts = () => async dispatch => {
    // if(localStorage.token){
    //     setAuthToken(localStorage.token)
    // }
    
    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })
        
        const res = await axios.get(`${apiUrl}/products`)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_PRODUCTS, 
            payload: res.data
        })

    }catch(error){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        setDispatchError(dispatch, error,PRODUCT_ERROR )
    }
} 

export const searchProducts = (text) => async dispatch => {

    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })
    
        let res = await axios.get(`${apiUrl}/products?filter={"q":${JSON.stringify(text)}}&range=[0,19]&sort=["date","ASC"]`)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: SEARCH_PRODUCTS,
            payload: res.data
        })
        
    }catch(error){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        setDispatchError(dispatch, error, PRODUCT_ERROR)

       
    }
} 

export const getProductByPrice = (price) => async dispatch => {
    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        let res = await axios.get(`${apiUrl}/products?filter={"price": ${JSON.stringify(price)}}&range=[0,19]&sort=["date","ASC"]`)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_PRODUCT_BY_PRICE,
            payload: res.data
        })

    }catch(error){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        setDispatchError(dispatch, error, PRODUCT_ERROR)
       
    }
} 

export const getByCategory = (name) => async dispatch => {

    try{
        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get(`${apiUrl}/products?filter={"category_name": ${JSON.stringify(name)}}`)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_PRODUCT_BY_CATEGORY,
            payload: res.data
        })

    }catch(error){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        setDispatchError(dispatch, error, PRODUCT_ERROR)

    }
}

export const getNewProducts = () => async dispatch => {

    try{
        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get(`${apiUrl}/products?filter={"new": "date"}`)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_NEW_PRODUCTS,
            payload: res.data
        })

    }catch(error){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        setDispatchError(dispatch, error, PRODUCT_ERROR)
    }
}

export const getHighestPrice =() => async dispatch => {
    try{

        const res = await axios.get(`${apiUrl}/products?filter={"getHighest":"price"}`)

        dispatch({
            type: GET_HIGHEST_PRICE,
            payload: res.data
        })

    }catch(error){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        setDispatchError(dispatch, error, PRODUCT_ERROR)

       
    }
}

export const getFeaturedProducts = () =>  async dispatch => {

    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        //?filter={"featured":"date"}
        const res = await axios.get(`${apiUrl}/products?filter={"featured":"abc"}`)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_FEATURED_PRODUCTS,
            payload: res.data
        })

    }catch(error){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        setDispatchError(dispatch, error, PRODUCT_ERROR)

    }

}


export const getReviews = () => async dispatch => {
    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get(`${apiUrl}/reviews`)

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

        setDispatchError(dispatch, error, REVIEWS_ERROR)

        
    }
}

export const getExtras = () => async dispatch => {

    try {

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get(`${apiUrl}/extra`)

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

        setDispatchError(dispatch, error, EXTRAS_ERROR)

    }
}

// export const GetAll = () => async dispatch => {
//     try {

        

//     }catch(error){
//         dispatch({
//             type: PRODUCT_ERROR,
//             payload: {
//                 msg: error.response.statusText,
//                 status: error.response.status
//             }
//         })
//     }
// }

export const deleteAccount = () => async dispatch => {
    dispatch({
        type: DELETE_ACCOUNT
    })
}