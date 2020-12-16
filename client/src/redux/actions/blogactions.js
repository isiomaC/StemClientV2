import {
    GET_BLOGS, 
    GET_BLOG,
    BLOG_ERROR, 
    SET_LOADING,
} from './types';
import axios from 'axios'

//import { uuid } from 'uuid';

const apiUrl ="http://localhost:5000/api"

export const getBlogs = () => async dispatch => {

    try{

        dispatch({
            type: SET_LOADING,
            payload: true
        })

        const res = await axios.get(`${apiUrl}/blogs`)
        console.log("[GET_BLOGS]", res.data)

        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: GET_BLOGS,
            payload: res.data
        })

    }catch(error){
        console.log(error)
        dispatch({
            type: SET_LOADING,
            payload: false
        })

        dispatch({
            type: BLOG_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
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

        dispatch({
            type: BLOG_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
};
  