import {
    ADD_REVIEWS,
    ADD_REVIEWS_ERROR,
    GET_PRODUCT, 
    PRODUCT_ERROR, 
    SET_LOADING,
} from './types';
import axios from 'axios'

//import { uuid } from 'uuid';

// const apiUrl ="https://inphinityapi.herokuapp.com/api"
const apiUrl ="http://localhost:5000/api"


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

        console.log(res.data)

        dispatch({
            type: ADD_REVIEWS,
            payload: {success: true}
        })
        dispatch({
            type: ADD_REVIEWS_ERROR,
            payload: {success: false}
        })

    }catch(error){
        console.log(error)
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: PRODUCT_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
  };
  