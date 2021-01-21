import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CART_ERROR,
    SET_LOADING,
    CLEAR_CART,
    INCREMENT,
    DECREMENT,
    SAVE_ADDRESS,
    SAVE_ADDRESS_ERROR,
    GET_DETAILS,
    GET_DETAILS_ERROR,
    DETAILS_COMPLETE,
    INVALID_QTY
} from './types';
import axios from 'axios'
import { setAlert } from './alert';

//import { uuid } from 'uuid';

const apiUrl = process.env.REACT_APP_API_URL

// const apiUrl = 'https://shrouded-hollows-95980.herokuapp.com/api'


export const addToCart = (product_idx, quantity, image, name, price, benefits, maxVal, category_id) => async dispatch => {

    try{

        if (quantity > 0 ){

            if (quantity > maxVal){
                dispatch({
                    type: INVALID_QTY,
                    payload: {}
                })

                dispatch(setAlert('Please use the stepper, selected quantity over stock', 'error'))

            }else{
                const res = await axios.get(`${apiUrl}/categories/${category_id}`);

                let category = res.data.name
    
                dispatch({
                    type: ADD_TO_CART,
                    payload: { product_idx, quantity, image, name, price, benefits, maxVal, category }
                })
            }
           
        }else{

            dispatch({
                type: INVALID_QTY,
                payload: {}
            })

            dispatch(setAlert('Please include a valid amount', 'error'))
        }
        
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

export const saveDetails = (shipping, user) => async dispatch=> {

    try{

        const { firstname, lastname, email, phonenumber } = shipping
        if (user && user.email){

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = {
                firstname,
                lastname,
                phonenumber,
            }
           
            const res = await axios.put(`${apiUrl}/customers`, JSON.stringify(body), config )

            if (res.data.success){
                dispatch({
                    type: SAVE_ADDRESS,
                    payload: { firstname, lastname, phonenumber, email: user.email }
                })

                dispatch({
                    type: DETAILS_COMPLETE,
                    payload: res.data.success
                })
            }
        }else{
            dispatch({
                type: SAVE_ADDRESS,
                payload: { firstname, lastname, phonenumber, email}
            })

            dispatch({
                type: DETAILS_COMPLETE,
                payload: true
            })
        }
    
    }catch(e){
        dispatch({
            type: SAVE_ADDRESS_ERROR,
            payload: {}
        })

        dispatch({
            type: DETAILS_COMPLETE,
            payload: false
        })
    }
}

export const getDetails = () => async dispatch => {
    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get(`${apiUrl}/customers/my/details`)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        if (res.data.success && res.data.details ){  //&& res.data.details is not null/undefined
            dispatch({
                type: GET_DETAILS,
                payload: res.data.details
            })

            dispatch({
                type: DETAILS_COMPLETE,
                payload: res.data.success
            })
        }else{
            dispatch({
                type: GET_DETAILS,
                payload: {}
            })
        }
        //else{
            // dispatch({
            //     type: GET_DETAILS,
            //     payload: {}
            // })
        //}

    }catch(e){
        dispatch({
            type: GET_DETAILS_ERROR,
            payload: {}
        })

        dispatch({
            type: DETAILS_COMPLETE,
            payload: false
        })
    }
}
