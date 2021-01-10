import {
    ADD_REVIEWS,
    ADD_REVIEWS_ERROR, 
    SET_LOADING,
} from './types';
import axios from 'axios'

//import { uuid } from 'uuid';

// const apiUrl ="https://inphinityapi.herokuapp.com/api"
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
  