

const setDispatchError = (dispatch, error, type ) => {
  
    if (typeof error.response == "undefined" || error.response === undefined){
        dispatch({
            type: type,
            payload: {
                msg: 'Service Unavailable',
                status: 503
            }
        })
    }else if (error.response.data){
        dispatch({
            type: type,
            payload: error.response.data
        })
    }else{
        dispatch({
            type: type,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export default setDispatchError;