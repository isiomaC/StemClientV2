import {
    ADD_TO_CART,
    CHECKOUT,
    REMOVE_FROM_CART,
    CART_ERROR,
    SET_LOADING,
    CLEAR_CART,
    INCREMENT,
    DECREMENT,
    SAVE_ADDRESS,
    SAVE_ADDRESS_ERROR,
    GET_ADDRESS,
    GET_ADDRESS_ERROR
} from './types';
import axios from 'axios'

//import { uuid } from 'uuid';
// const apiUrl ="https://inphinityapi.herokuapp.com/api"
const apiUrl ="http://localhost:5000/api"

export const addToCart = (product_idx, quantity, image, name, price, benefits, maxVal, category_id) => async dispatch => {

    try{
       
        const res = await axios.get(`${apiUrl}/categories/${category_id}`);

        let category = res.data.name

        console.log({ product_idx, quantity, image, name, price, benefits, maxVal, category })

        dispatch({
            type: ADD_TO_CART,
            payload: { product_idx, quantity, image, name, price, benefits, maxVal, category }
        })
      
        // console.log("[CARTADD]", {product_idx, quantity, image, name, price, benefits, maxVal, category})

    }catch(error){
        dispatch({
            type: CART_ERROR,
            payload: {}
        })
    }
};

export const increment = (id, max) => async dispatch => {
    try{

        dispatch({
            type: INCREMENT,
            payload: { id, max }
        })

    }catch(e){
        dispatch({
            type: CART_ERROR,
            payload: {}
        })
    }
}

export const decrement = (id) => async dispatch => {
    try{
        dispatch({
            type: DECREMENT,
            payload: { id }
        })

    }catch(e){
        dispatch({
            type: CART_ERROR,
            payload: {}
        })
    }
}


export const removeFromCart = (product_idx) => async dispatch => {

    try{

        dispatch({
            type: REMOVE_FROM_CART,
            payload: product_idx
        })

    }catch(error){
        dispatch({
            type: CART_ERROR,
            payload: {}
        })
    }
};
  
export const clearCart = () => async dispatch => {

    try{

        dispatch({
            type: CLEAR_CART
        })

    }catch(error){
        dispatch({
            type: CART_ERROR,
            payload: {}
        })

    }
}

export const saveAddress = (shipping) => async dispatch=> {

    try{

        const { firstname, lastname, address, city, eirCode, country, email } = shipping
        console.log(shipping)

        const fullname = firstname + ' '+ lastname
        dispatch({
            type: SAVE_ADDRESS,
            payload: { firstname, lastname, address, city, eirCode, country, email }
        })
    
    }catch(e){
        dispatch({
            type: SAVE_ADDRESS_ERROR,
            payload: {}
        })
    }
}

export const getAddress = () => async dispatch => {
    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get(`${apiUrl}/customers/my/address`)
        console.log('[ADDRESS]', res)

        // const cart = localStorage.getItem("cart")
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_ADDRESS,
            payload: res.data.data
        })

    }catch(e){
        dispatch({
            type: GET_ADDRESS_ERROR,
            payload: {}
        })
    }
}