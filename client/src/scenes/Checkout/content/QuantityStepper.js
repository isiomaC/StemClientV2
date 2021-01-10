import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { connect } from 'react-redux'

import { increment, decrement } from '../../../redux/actions/shoppingcart'

const useStyles = makeStyles(theme => ({
    root: {
        height: '20px',
        display: 'flex',
        justifyContent: 'space-evenly',        
    },
    items: {
        backgroundColor: 'black'
    },
    input: {
        width: '20px',
        textAlign: 'center',
        '&::-webkit-outer-spin-button' :{
            margin: 0,
            WebkitAppearance: 'none'
        },
        '&::-webkit-inner-spin-button' :{
            margin: 0,
            WebkitAppearance: 'none'
        },
    },
    iconBg : {
        background: 'rgba(204, 246, 200, 0.8)', 
        display: 'flex', 
        alignItems: 'center',
        borderRadius: '5px',
        '&:hover': {
            color: 'white'
        }
    }
}))
const QuantityStepper = ({ amount, max, product_id, increment, decrement}) => {

    const classes = useStyles()
    React.useState(() => {
    }, [])
    
    return (
        <Box className={classes.root}>
            <div className={classes.iconBg} >
                <AddIcon onClick={() => increment(product_id, max)}/>
            </div>
            <div >
            <input
                className={classes.input}
                id="outlined-number"
                type="number"
                value={amount}
                readOnly
            />
            </div>
            <div className={classes.iconBg} >
                <RemoveIcon onClick={() => decrement(product_id)}/>
            </div>
        </Box>
    )
}

QuantityStepper.propTypes = {
    amount: PropTypes.number,
    product_id: PropTypes.number,
    increment: PropTypes.func,
    decrement: PropTypes.func,
    max: PropTypes.number
}


export default connect(null, { increment, decrement })(QuantityStepper);