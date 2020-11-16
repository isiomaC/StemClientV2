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
  ADMIN_LOGIN
} from './types';
import setAuthToken from '../../utils/setAuthToken';

const apiUrl ="https://inphinityapi.herokuapp.com/api"

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
            // console.log("[LOADUSER]", res.data)

        }catch(error){

            dispatch({
                type: AUTH_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
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

        dispatch({
            type: LOGIN_FAIL,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
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

        dispatch({
            type: REGISTER_FAIL,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const logout = () => dispatch => {
    dispatch({ type: CLEAR_USER });
    dispatch({ type: LOG_OUT });
};