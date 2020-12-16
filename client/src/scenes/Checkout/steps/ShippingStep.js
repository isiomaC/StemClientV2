import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
import  Typography  from '@material-ui/core/Typography'
import  Button  from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import shoppingcart from '../../../redux/reducers/shoppingcart'
import PropTypes from 'prop-types'
import { saveAddress, getAddress } from '../../../redux/actions/shoppingcart'
import ValidateEmail from '../utils/ValidateEmail'

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

const ShippingStep = ({ shoppingcart, dispatch, user, getAddress}) => {

    const classes = useStyles()

    const [shipping, setShipping] = useState(shoppingcart.shippingAddress || {
        firstname: '',
        lastname: '',
        address: '',
        city: '',
        eirCode: '',
        country: '',
        email:''
    });

    const [errors, setErrors] = useState(null)

    const { firstname, lastname, address, city, eirCode, country, email } = shipping

    useEffect(()=> {
        ( async ()=> {
            await getAddress()
        })()
    }, [])

    const onChange = e =>{
        setShipping({ ...shipping, 
          [e.target.name]: e.target.value 
        });

        setErrors(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try{

            if (email === '' && firstname === '' && lastname === '' && address === '' && city === '' &&eirCode === '' && country === '') {
                setErrors({
                  firstname: 'firstname field is empty',
                  lastname: 'lastname field is empty',
                  email: 'email field is empty',
                  address: 'address field is empty',
                  city: 'city field is empty',
                  eirCode: 'eirCode field is empty',
                  country: 'country field is empty'
                })
                return
            }

            if (!email || email === '' ){
                setErrors({...errors,
                    email: 'email field is empty'
                })
                return
            }else if(ValidateEmail(email) === false){
                setErrors({...errors,
                    email: 'please enter a valid email'
                })
                return
            }

            if (!firstname || firstname === '' ){
                setErrors({...errors,
                    firstname: 'firstname field is empty'
                })
                return
            }

            if (!lastname || lastname === '' ){
                setErrors({...errors,
                    lastname: 'lastname field is empty'
                })
                return
            }

            if (!address || address === '' ){
                setErrors({...errors,
                    address: 'address field is empty'
                })
                return
            }

            if (!city || city === '' ){
                setErrors({...errors,
                    city: 'city field is empty'
                })
                return
            }

            if (!eirCode || eirCode === '' ){
                setErrors({...errors,
                    eirCode: 'eirCode field is empty'
                })
                return
            }

            if (!country || country === '' ){
                setErrors({...errors,
                    country: 'country field is empty'
                })
                return
            }
            dispatch(saveAddress(shipping))
        }catch(e){
            setErrors(e.message)
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
                label="First name"
                placeholder="First name"
                type="text"
                name ="firstname"
                value={firstname}
                onChange={e => onChange(e)}
                variant="outlined"
                error={(errors && errors.firstname) && true}
                helperText={(errors && errors.firstname) && errors.firstname}
                
                />
                  <TextField
                className={classes.textField}
                id="outlined-textarea-1"
                label="Last name"
                placeholder="Last name"
                type="text"
                name ="lastname"
                value={lastname}
                onChange={e => onChange(e)}
                variant="outlined"
                error={(errors && errors.lastname) && true}
                helperText={(errors && errors.lastname) && errors.lastname}
                
                />
                {
                   user === null || user.msg && <TextField
                    className={classes.textField}
                    id="outlined-textarea-1"
                    label="Email"
                    placeholder="Email"
                    type="email"
                    name ="email"
                    value={email}
                    onChange={e => onChange(e)}
                    variant="outlined"
                    error={(errors && errors.email) && true}
                    helperText={(errors && errors.email) && errors.email}/>
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
                    error={(errors && errors.address) && true}
                    helperText={(errors && errors.address) && errors.address}
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
                    error={(errors && errors.city) && true}
                    helperText={(errors && errors.city) && errors.city}
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
                    error={(errors && errors.eirCode) && true}
                    helperText={(errors && errors.eirCode) && errors.eirCode}
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
                    error={(errors && errors.country) && true}
                    helperText={(errors && errors.country) && errors.country}
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
    shoppingcart: PropTypes.object,
    getAddress: PropTypes.object
}

const mapStateToProps = state => ({
    shoppingcart: state.shoppingcart,
})


export default connect(mapStateToProps, { getAddress })(ShippingStep)