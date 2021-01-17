import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  CLEAR_USER, 
} from './types';
import setAuthToken from '../../utils/setAuthToken';

import setDispatchError from '../../utils/setDispatchError'


// const apiUrl ="https://inphinityapi.herokuapp.com/api"
const apiUrl = process.env.REACT_APP_API_URL

// const apiUrl = 'https://shrouded-hollows-95980.herokuapp.com/api'

export  const loadUser = () => dispatch =>
    new Promise( async (resolve, reject) => {
        if (localStorage.token){
            setAuthToken(localStorage.token)
        }
        
        try{
            const res = await axios.get(`${apiUrl}/auth`)
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });

            resolve(res.data)

        }catch(error){

            let errorPayload = {}
   
            if (typeof error.response === 'undefined'){
                errorPayload = {
                    msg: 'Server Not reachable',
                    status: 500
                }
            }else{
                errorPayload = {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            }

            dispatch({
                type: AUTH_ERROR,
                payload: errorPayload
            })
            reject(error)
        }
    })
       

export const login = (formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const res = await axios.post(`${apiUrl}/auth`, formData, config)
        dispatch({
            type: LOGIN_SUCCESS, 
            payload: res.data
        })

        dispatch(loadUser())

    }catch(error){     

        if (Object.keys(error.response.data.error).length > 0){
            dispatch(setAlert(error.response.data.error, 'error'))
        }

        setDispatchError(dispatch, error, LOGIN_FAIL)

    }
}


export const register = (formData)=> async dispatch => {

    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }

    // const body = JSON.stringify({email, password, password2})

    try{

        const res =  await axios.post(`${apiUrl}/users`, formData, config)

        dispatch({
            type: REGISTER_SUCCESS, 
            payload: res.data
        })
        dispatch(loadUser())
    }catch(error){

        if (Object.keys(error.response.data.error).length > 0){
            dispatch(setAlert(error.response.data.error, 'error'))
        }
        setDispatchError(dispatch, error, REGISTER_FAIL)
       
    }
}



export const logout = () => dispatch => {
    dispatch({ type: CLEAR_USER });
    dispatch({ type: LOG_OUT });
};