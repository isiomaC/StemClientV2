import {
    GET_BLOGS, 
    GET_BLOG,
    BLOG_ERROR, 
    SET_LOADING,
} from './types';
import axios from 'axios'

import setDispatchError from '../../utils/setDispatchError'

const apiUrl = process.env.REACT_APP_API_URL

export const getBlogs = () => async dispatch => {

    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get(`${apiUrl}/blogs`)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_BLOGS,
            payload: res.data
        })

    }catch(error){
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        setDispatchError(dispatch, error, BLOG_ERROR)
        
    }
  };
  

export const getBlog = (id) => async dispatch => {

    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get(`${apiUrl}/blogs/${id}`)
        console.log("[GET_BLOG]", res.data)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_BLOG,
            payload: res.data
        })
        

    }catch(error){
        console.log(error)
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        setDispatchError(dispatch, error, BLOG_ERROR)
        
    }
};
  