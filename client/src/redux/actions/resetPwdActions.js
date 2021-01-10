import {
    RESET_PASSWORD_EMAIL_SENT,
    RESET_PASSWORD_EMAIL_SENT_ERROR,
    RESET_PASSWORD_FINISH,
    RESET_PASSWORD_FINISH_ERROR
} from './types';
import setDispatchError from '../../utils/setDispatchError'
import axios from 'axios'
import { setAlert } from './alert';

const apiUrl = "http://localhost:5000/api"

export const resetpassword = (form) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    // const body = JSON.stringify({email, password, password2})

    try{
        const res =  await axios.post(`${apiUrl}/resetpassword`, form, config)
        dispatch({
            type: RESET_PASSWORD_EMAIL_SENT, 
            payload: res.data
        })

        dispatch(setAlert(res.data.message, 'info'))

    }catch(error){

        setDispatchError(dispatch, error, RESET_PASSWORD_EMAIL_SENT_ERROR)
    }
}

export const resetpasswordfinish = (form) => async dispatch => {

    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }

    try{
        const res = await axios.post(`${apiUrl}/resetpassword/finish`, form, config)

        dispatch({
            type: RESET_PASSWORD_FINISH,
            payload: res.data
        })

    }catch(error){
        setDispatchError(dispatch, error, RESET_PASSWORD_FINISH_ERROR)
    }
}