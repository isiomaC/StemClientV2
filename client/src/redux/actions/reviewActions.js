import {
    ADD_REVIEWS,
    ADD_REVIEWS_ERROR, 
    SET_LOADING,
    GET_REVIEWS_FOR_PRODUCT,
    REVIEWS_ERROR
} from './types';

import setDispatchError from '../../utils/setDispatchError'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

export const addReviews = (rating, product_id, comment) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{

        const form = {
            comment: comment,
            rating: rating,
            id: product_id
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post(`${apiUrl}/reviews/`, form, config)

        dispatch({
            type: ADD_REVIEWS,
            payload: {success: true}
        })
        dispatch({
            type: ADD_REVIEWS_ERROR,
            payload: {success: false}
        })

    }catch(error){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        setDispatchError(dispatch, error, ADD_REVIEWS_ERROR)
       
    }
  };

  export const getReviewsForProduct = (product_id) => async dispatch => {
    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get(`${apiUrl}/reviews?filter={"product_id" : ${product_id}}`)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_REVIEWS_FOR_PRODUCT,
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
  