import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../../Components/layout/Spinner'


 const Test = ({ extras }) => {

    if (Object.keys(extras).length === 0){

    }else{

    }
    return Object.keys(extras).length === 0 ? (
        <Spinner/>
    ): (
       <div>
           {extras.landingText}
       </div>
    )
}

Test.propTypes = {
    extras: PropTypes.object
}

export default Test
