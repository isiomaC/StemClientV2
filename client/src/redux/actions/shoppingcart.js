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
const apiUrl ="https://inphinityapi.herokuapp.com/api"

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

        const { fullname, address, city, eirCode, country, email } = shipping
        console.log(shipping)

        dispatch({
            type: SAVE_ADDRESS,
            payload: { fullname, address, city, eirCode, country, email }
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

        const cart = localStorage.getItem("cart")
        
        if (cart !== null){
            cart = JSON.parse(cart)
            const address = cart.shippingAddress

            dispatch({
                type: GET_ADDRESS,
                payload: address
            })
        }

    }catch(e){
        dispatch({
            type: GET_ADDRESS_ERROR,
            payload: {}
        })
    }
}