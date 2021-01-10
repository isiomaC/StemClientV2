import React, { useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Typography, Box, Divider } from '@material-ui/core';
import ValidateEmail from '../Checkout/utils/ValidateEmail'

import axios from 'axios'

//actions
import { resetpassword, resetpasswordfinish } from '../../redux/actions/resetPwdActions'

import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock'

//Icons
import PersonIcon from '@material-ui/icons/Person';


const apiUrl = 'http://localhost:5000/api'

const useStyles = makeStyles(theme => ({
    rootForm: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '45ch',
        [theme.breakpoints.down('xs')]: {
          width: 'calc(100% - 20px)'
        }
      }
    },
    div: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '60vh',
    },
    paper: {
        background: 'transparent', 
        minHeight: '80px',
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100vw - 30px)'
        }
    },
    header: {
        marginTop: '30px'
    },
    btn: {
        marginBottom:'10px',
        '&:hover': {
            color: 'red',
            background: 'white'
        }
    },
    linkSignUP:{
        margin: theme.spacing(1)
    },
    title: {
        textAlign: 'left',
        paddingTop: '10px'
    },
    body:{
        textDecoration: 'none',
        margin: '10px'
    },
    pwdNotMatch:{
        color: 'red'
    }
}))

const ResetPassword = ({ alert, resetPwd, resetpassword, match, resetpasswordfinish }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    })
    const [errors, setErrors] = useState(null)
    const [response, setResponse] = useState([])

    const [token, setToken] = useState('')

    const { email, password, password2 } = formData

    const { resetPwdStart, resetPwdFinish} = resetPwd;

    const classes = useStyles()

    useEffect(() => {
        // console.log(match.params.token)

        if (match.params.token){
            setToken(match.params.token)
        }

    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

        setErrors({ 
            ...errors,
            mismatch: null,
            [e.target.name]: null
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let form = {}

        if (token){

            if(password === '' || !password){
                setErrors({
                    ...errors,
                    password: 'please input valid password'
                })
                return
            }

            if (password2 === '' || !password2){
                setErrors({
                    ...errors,
                    password2: 'please repeat thesame password'
                })
                return
            }

            if (password !== password2){
                setErrors({
                    ...errors,
                    mismatch: 'Passwords do not match'
                })
                return
            }

            form = {
                password: password,
                password2: password2,
                token: token
            }

            // await resetpassword(form)
            await resetpasswordfinish(form)
           
        }else{

            if (email === ''){
                setErrors({
                    ...errors,
                    email: 'email field is empty'
                })
                return

            }else if(ValidateEmail(email) === false){
                setErrors({
                    ...errors,
                    email: 'Please include a valid email'
                })
                return
            }
    
            form = {
                email: email
            }
            await resetpassword(form)
        }
    }

    return ( 
        token ? ( 
        <div className={classes.div}>
            <Box className={classes.box}>
                { resetPwdFinish && resetPwdFinish.success 
                    ?
                        <Typography variant='h6' className={classes.title}>Password Reset Successful</Typography>
                    :
                        <Typography variant='h6' className={classes.title}> Reset Password</Typography>
                }
                <Paper className={classes.paper}>
                    <form className={classes.rootForm} onSubmit={e => handleSubmit(e)}>
                       {resetPwdFinish 
                       
                        ?  (resetPwdFinish.success
                            ?
                                <div>
                                    <Typography className={classes.body} variant='body1'> Congratulations!!</Typography>
                                    <Typography className={classes.body} variant='body1'> Your password has been changed successfully</Typography>
                                    <Typography className={classes.body}><Link className={classes.body} to='/login'>login</Link></Typography>
                                </div>  
                            :
                                <div>
                                    <Typography className={classes.body} variant='body1'> Ooops!! Something went wrong</Typography>
                                    {resetPwdFinish.msg && (
                                        <Typography className={classes.body} variant='body1'> {resetPwdFinish.msg}</Typography>
                                    )}
                                </div>
                            )
                        :
                            (<>
                                <div>
                                    {(errors && errors.mismatch) && <Typography className={classes.pwdNotMatch}>{errors.mismatch}</Typography>}
                                    <TextField
                                        error={(errors && errors.password) && true}
                                        helperText={(errors && errors.password) && errors.password}
                                        id="outlined-textarea"
                                        label="password"
                                        placeholder="please enter a valid password"
                                        type="password"
                                        name ="password"
                                        value={password}
                                        onChange={e => handleChange(e)}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        error={(errors && errors.password2) && true}
                                        helperText={(errors && errors.password2) && errors.password2}
                                        id="outlined-textarea"
                                        label="password2"
                                        placeholder="repeat thesame password"
                                        type="password"
                                        name ="password2"
                                        value={password2}
                                        onChange={e => handleChange(e)}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <Button variant="outlined" className={classes.btn} type='submit' value='Login' disableElevation>
                                    reset password 
                                </Button>
                            </>)
                        }
                       
                    </form>
                </Paper>
            </Box>
        </div>
    ) : ( 
        <div className={classes.div}>
            <Box className={classes.box}>
               { resetPwdStart && resetPwdStart.success 
                    ? 
                    <>
                        <Typography variant='h6' className={classes.title}>Reset Password Email Sent</Typography>
                        <Divider/>
                    </>
                    :
                        <Typography variant='h6' className={classes.title}>Reset Your Password</Typography>
                }
                <Paper className={classes.paper}>
                    <form className={classes.rootForm} onSubmit={e => handleSubmit(e)}>
                        { resetPwdStart ?
                            resetPwdStart.success ? (
                                <Typography variant='body1' className={classes.body} style={{ textAlign: 'center'}}>Please check your inbox (Including Spam folders). </Typography>
                            ):(
                                <>
                                    <Typography className={classes.body} variant='body1'>Ooops!! Something went wrong</Typography>
                                    {resetPwdStart.msg && (
                                        <>
                                            <Typography className={classes.body} variant='body1'> {resetPwdStart.msg}</Typography>
                                            <Typography className={classes.body}><Link className={classes.body } to='/register'>Create an account</Link></Typography>
                                        </>)
                                    }
                                </>
                            )
                        :
                            (<>
                                <div>
                                    <TextField
                                        error={(errors && errors.email) && true}
                                        helperText={(errors && errors.email) && errors.email}
                                        id="outlined-textarea"
                                        label="email"
                                        placeholder="please enter a valid email"
                                        type="text"
                                        name ="email"
                                        value={email}
                                        onChange={e => handleChange(e)}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                {alert.length !== 0 && <Typography style={{ fontSize: '0.9rem', color: 'green'}}>{alert[0].msg}</Typography>}
                                <Button variant="outlined" className={classes.btn} type='submit' value='Login' disableElevation>
                                    Send Reset Email 
                                </Button>
                            </>)
                        }
                    </form>
                </Paper>
            </Box>
            </div>
        )
    )
}

ResetPassword.propTypes = {
    resetPwd: PropTypes.object,
    alert: PropTypes.array,
    resetpassword: PropTypes.func,
    resetpasswordfinish: PropTypes.func
}

const mapStateToProps = state => ({
    alert: state.alert,
    resetPwd: state.resetPwdReducer,
})

export default connect(mapStateToProps, { resetpassword, resetpasswordfinish })(ResetPassword)