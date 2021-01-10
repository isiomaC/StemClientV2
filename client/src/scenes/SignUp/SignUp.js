import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import LockIcon from '@material-ui/icons/Lock'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';

import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles' 
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Spinner from '../../Components/layout/Spinner';
import { register } from '../../redux/actions/auth'
import ValidateEmail from '../Checkout/utils/ValidateEmail';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '45ch',
        [theme.breakpoints.down('xs')]: {
          width: 'calc(100% - 20px)'
        }
      }
    },
    div:{
        margin: '10px',
        // width : '35ch'
    },
    header:{
      marginTop: '30px'
    },
    btn: {
      marginBottom: '20px',
        '&:hover': {
          color: 'red',
          background: 'white'
        }
    },
    container: {
      width: '100vw',
      height: '60vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        height: '80vh'
      }
    }, 
    paper: {
      background: 'transparent',
      [theme.breakpoints.down('xs')]: {
        width: 'calc(100vw - 30px)'
      }
    }
}))

const SignUp = ({ register, loading, isAuthenticated, alert}) => {

    const classes = useStyles()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    });

    const [errors, setErrors] = useState(null)

    const [showPassword, setShowPassword] = useState(false)

    const { firstname, lastname, email, password, password2 } = formData;

    useEffect(() => {
        
    }, [])

    const onChange = e =>{
      setFormData({ ...formData, 
          [e.target.name]: e.target.value 
      });

      setErrors(null)
    }

    const handleClickShowPassword = () => {
        setShowPassword(showPassword => !showPassword)
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
  
    const onSubmit = async e => {
      e.preventDefault();
  
      if (email === '' && password === '' && password2 === ''){
        setErrors({
          password: 'password field is empty',
          password2: 'password field is empty',
          email: 'email field is empty'
        })
        return
      }
      if (email === '' || !email){
        setErrors({...errors,
          email: 'email field is empty'
        })
        return
      }else if(ValidateEmail(email) === false){
        setErrors({
          email: 'please input a valid email'
        })
        return
      }
      if (password === '' || !password){
        setErrors({...errors,
          password: 'password field is empty'
        })
        return
      }
      if (password2 === '' || !password2){
        setErrors({...errors,
          password2: 'password field is empty'
        })
        return
      }

      let form = JSON.stringify(formData);

      await register(form);
  
    };
  
    if (isAuthenticated) {
        return <Redirect to={{
            pathname:'/'
        }}/>
    }

    return (
        loading === true ? (
            <Spinner />
        ): (
            <Box className={classes.container}>
              <Paper className={classes.paper}>
                <h2 className={classes.header}>Sign Up</h2>
                {alert.length > 0 && <Typography style={{ fontSize: '0.9rem', color: 'red'}}>{alert[0].msg + ', ' + 'please use the sign in page'}</Typography>}
                <form className={classes.root} onSubmit={e => onSubmit(e)}>
                    {/* <div className={classes.div}> */}
                        {/* <TextField
                            id="outlined-textarea"
                            label="First name"
                            // placeholder="email"
                            type="text"
                            name ="firstname"
                            value={firstname}
                            onChange={e => onChange(e)}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PersonIcon />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="start">
                                      {/* <VisibilityOffIcon /> */}
                                    {/* </InputAdornment> */}
                                  {/* ), */}
                              {/* }}
                        /> */}
                    {/* </div>
                    <div className={classes.div}>
                        <TextField
                            id="outlined-textarea"
                            label="Last name"
                            // placeholder="lastname"
                            type="text"
                            name ="lastname"
                            value={lastname}
                            onChange={e => onChange(e)}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PersonIcon />
                                  </InputAdornment>
                                ),
                              }}
                        />
                    </div> */} 
                    <div className={classes.div}>
                         <TextField
                             error={(errors && errors.email) && true}
                             helperText={(errors && errors.email) && errors.email}
                            id="outlined-textarea"
                            label="Email"
                            // placeholder="email"
                            type="text"
                            name ="email"
                            value={email}
                            onChange={e => onChange(e)}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmailIcon />
                                  </InputAdornment>
                                ),
                                // endAdornment: ()
                                  // <InputAdornment position="start">
                                  //   {/* <VisibilityOffIcon /> */}
                                  // </InputAdornment>
                                
                              }}
                        />
                    </div>
                    <div className={classes.div}>
                         <TextField
                             error={(errors && errors.password) && true}
                             helperText={(errors && errors.password) && errors.password}
                            id="outlined-textarea"
                            label="Password"
                            // placeholder="email"
                            type={showPassword ? "text" : "password"}
                            name ="password"
                            value={password}
                            onChange={e => onChange(e)}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockIcon />
                                  </InputAdornment>
                                ),

                                endAdornment: (
                                    <InputAdornment position="start">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                        { showPassword ? <Visibility/> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                                ),
                              }}
                        />
                    </div>
                    <div className={classes.div}>
                         <TextField
                            error={(errors && errors.password2) && true}
                            helperText={(errors && errors.password2) && errors.password2}
                            id="outlined-textarea"
                            label="Password Again"
                            // placeholder="email"
                            type={showPassword ? "text" : "password"}
                            name ="password2"
                            value={password2}
                            onChange={e => onChange(e)}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockIcon />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}>
                                            { showPassword ? <Visibility/> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                              }}
                        />
                    </div>
                    <Button variant="outlined" className={classes.btn} type='submit' value='Register' disableElevation>
                        Create Account 
                    </Button>
                </form>
                </Paper>
            </Box>
        )
    )
}

SignUp.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    alert: PropTypes.arrayOf(PropTypes.object)
};
  
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    alert: state.alert
});

export default connect(mapStateToProps, { register })(SignUp);