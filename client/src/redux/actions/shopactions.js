import {
    GET_PRODUCT, 
    PRODUCT_ERROR, 
    SET_LOADING,
} from './types';
import axios from 'axios'
import setDispatchError from '../../utils/setDispatchError'

// const apiUrl ="https://inphinityapi.herokuapp.com/api"
const apiUrl = process.env.REACT_APP_API_URL

// const apiUrl = 'https://shrouded-hollows-95980.herokuapp.com/api'



export const getProduct = (idx) => async dispatch => {

    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get(`${apiUrl}/products/${idx}`)
 
        dispatch({
            type: SET_LOADING,
            payload: false
        })
        dispatch({
            type: GET_PRODUCT,
            payload: res.data
        })

    }catch(error){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        setDispatchError(dispatch, error, PRODUCT_ERROR )
       
    }
  };
  