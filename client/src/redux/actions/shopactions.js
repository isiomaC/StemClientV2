import {
    GET_PRODUCT, 
    PRODUCT_ERROR, 
    SET_LOADING,
} from './types';
import axios from 'axios'

//import { uuid } from 'uuid';

const apiUrl ="https://inphinityapi.herokuapp.com/api"


export const getProduct = (idx) => async dispatch => {

    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get(`${apiUrl}/products/${idx}`)
        // console.log("[SHOPACTIONS]", res.data)

        dispatch({
            type: SET_LOADING,
            payload: false
        })
        dispatch({
            type: GET_PRODUCT,
            payload: res.data
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
  