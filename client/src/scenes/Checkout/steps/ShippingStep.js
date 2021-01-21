import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
import  Typography  from '@material-ui/core/Typography'
import  Button  from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { saveDetails } from '../../../redux/actions/shoppingcart'
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

const ShippingStep = ({ shoppingcart, dispatch, user, saveDetails, getDetails}) => {

    const classes = useStyles()

    const [shipping, setShipping] = useState(shoppingcart.shippingAddress || {
        firstname: '',
        lastname: '',
        email:'',
        phonenumber: ''
    });

    const [errors, setErrors] = useState(null)

    
    useEffect(()=> {
        // const getDet = async () => {
        //     if (user && user.email){
        //        await getDetails()
        //        //setShipping(shoppingcart.shippingAddress)
        //     }
        // }
        // getDet()
        
    }, [])

    const { firstname, lastname, email, phonenumber } = shipping


    const onChange = e =>{
        setShipping({ ...shipping, 
          [e.target.name]: e.target.value 
        });

        setErrors(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{

            if (user && user.email){
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
    
                if (!phonenumber || phonenumber === '' ){
                    setErrors({...errors,
                        address: 'address field is empty'
                    })
                    return
                }
                await saveDetails(shipping, user)

            }else{

                if (email === '' && firstname === '' && lastname === '' && phonenumber === '') {
                    setErrors({
                    firstname: 'firstname field is empty',
                    lastname: 'lastname field is empty',
                    email: 'email field is empty',
                    phonenumber: 'Phone number field is empty'
                    })
                    return
                }

                // if(user && user.msg){

                // }

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

                if (!phonenumber || phonenumber === '' ){
                    setErrors({...errors,
                        address: 'address field is empty'
                    })
                    return
                }

                await saveDetails(shipping, user)

            }

        }catch(e){
            setErrors(e.message)
        }
        //Save shipping address to redux state
        //configure function to answer 
    }

    return (
        <Container>
            <Typography variant='h5'> Enter your details </Typography>
            <Typography variant='body2'> Please include thesame name that will be used for checkout </Typography>
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
                   (!user || user.msg) && <TextField
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
                    label="Phone Number"
                    placeholder="Phone Number"
                    type="text"
                    name="phonenumber"
                    value={phonenumber}
                    onChange={e => onChange(e)}
                    variant="outlined"
                    error={(errors && errors.phonenumber) && true}
                    helperText={(errors && errors.phonenumber) && errors.phonenumber}
                />
                {/* <TextField
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
                /> */}
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
    // getAddress: PropTypes.func,
    saveDetails: PropTypes.func,
    user: PropTypes.object
}

const mapStateToProps = state => ({
    shoppingcart: state.shoppingcart,
})


export default connect(mapStateToProps, { saveDetails })(ShippingStep)