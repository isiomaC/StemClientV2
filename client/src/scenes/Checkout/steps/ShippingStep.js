import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
import  Typography  from '@material-ui/core/Typography'
import  Button  from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import shoppingcart from '../../../redux/reducers/shoppingcart'
import PropTypes from 'prop-types'
import { saveAddress } from '../../../redux/actions/shoppingcart'

const useStyles = makeStyles(theme => ({
    div:{
        padding: '10px',
        margin: '10px',
        // width : '35ch'
        background: 'rgba(255, 255, 255, 0.6)',
        display: 'flex',
        flexDirection: 'column'
    },
    btn:{
        background: 'rgba(9, 0, 59, 0.9)',
        color: 'white',
        '&:hover': {
            background: "rgba(9, 0, 59, 0.9)",
            color: 'red'
         },
    },
    textField: {
        width: '60%',
        [theme.breakpoints.down('sm')]:{
            width: '100%',
        },
        marginLeft: 'auto',
        marginRight: 'auto', 
        marginBottom:'10px'           
    },
}))

const ShippingStep = ({ shoppingcart, dispatch, user}) => {

    const classes = useStyles()
    const [error, setError]= useState('')
    const [shipping, setShipping] = useState(shoppingcart.shippingAddress || {
        fullname: '',
        address: '',
        city: '',
        eirCode: '',
        country: '',
        email:''
    });

    const { fullname, address, city, eirCode, country, email } = shipping

    const onChange = e =>{
      setShipping({ ...shipping, 
          [e.target.name]: e.target.value 
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            if (!fullname || fullname === '' ){
                setError({

                })
            }
            dispatch(saveAddress(shipping))
        }catch(e){
            setError(e.message)
        }
        //Save shipping address to redux state
        //configure function to answer 
    }

    return (
        <Container>
            <Typography> Shipping/Delivery Address </Typography>
            <form className={classes.div} onSubmit={e => handleSubmit(e)}>
                <TextField
                className={classes.textField}
                id="outlined-textarea-1"
                label="Full name"
                placeholder="Full name"
                type="text"
                name ="fullname"
                value={fullname}
                onChange={e => onChange(e)}
                variant="outlined"
                helperText={error && ''}
                />
                 {
                   user.msg && <TextField
                    className={classes.textField}
                    id="outlined-textarea-1"
                    label="Email"
                    placeholder="Email"
                    type="email"
                    name ="email"
                    value={email}
                    onChange={e => onChange(e)}
                    variant="outlined"
                    helperText={error && ''}
                />
                }
                <TextField
                    className={classes.textField}
                    id="outlined-textarea-2"
                    label="Address"
                    placeholder="Address"
                    type="text"
                    name="address"
                    value={address}
                    onChange={e => onChange(e)}
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    id="outlined-textarea-3"
                    label="City"
                    placeholder="City"
                    type="text"
                    name="city"
                    value={city}
                    onChange={e => onChange(e)}
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    id="outlined-textarea-4"
                    label="Eircode"
                    placeholder="Eircode"
                    type="text"
                    name="eirCode"
                    value={eirCode}
                    onChange={e => onChange(e)}
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    id="outlined-textarea-5"
                    label="Country"
                    placeholder="Country"
                    type="text"
                    name="country"
                    value={country}
                    onChange={e => onChange(e)}
                    variant="outlined"
                />
                <div>
                    <Button variant="outlined" className={classes.btn} type='submit' value='Login' disableElevation>
                        Save Address 
                    </Button>
                </div>
            </form>
            
        </Container>
    )
}

ShippingStep.propTypes ={
    shoppingcart: PropTypes.object
}

const mapStateToProps = state => ({
    shoppingcart: state.shoppingcart
})


export default connect(mapStateToProps)(ShippingStep)