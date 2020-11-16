import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';

import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles' 
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Spinner from '../../Components/layout/Spinner';
import { register } from '../../redux/actions/auth'

const useStyles = makeStyles(theme => ({
    root: {
        margin: '20px'
    },
    div:{
        margin: '10px',
        // width : '35ch'
    },
    header:{

    },
    btn: {
        backgroundColor: 'rgba(0,0,180, 0.7)'
    }
}))

const SignUp = ({ register, loading, isAuthenticated}) => {

    const classes = useStyles()
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: ''
    });

    const [showPassword, setShowPassword] = useState(false)

    const { firstname, lastname, email, password, password2 } = formData;

    useEffect(() => {
        
    }, [])

    const onChange = e =>{
      setFormData({ ...formData, 
          [e.target.name]: e.target.value 
        });
    }

    const handleClickShowPassword = () => {
        setShowPassword(showPassword => !showPassword)
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
  
    const onSubmit = async e => {
      e.preventDefault();
  
      let form = JSON.stringify(formData);

      try {
        await register(form);
  
      }catch(e){
        console.log(e.message)
      }
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
            <Fragment>
                <h2 className={classes.header}>Sign Up</h2>
                <form className={classes.root} onSubmit={e => onSubmit(e)}>
                    <div className={classes.div}>
                        <TextField
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
                                    </InputAdornment>
                                  ),
                              }}
                        />
                    </div>
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
                    </div>
                    <div className={classes.div}>
                         <TextField
                            id="outlined-textarea"
                            label="Email"
                            // placeholder="email"
                            type="email"
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
                                endAdornment: (
                                  <InputAdornment position="start">
                                    {/* <VisibilityOffIcon /> */}
                                  </InputAdornment>
                                ),
                              }}
                        />
                    </div>
                    <div className={classes.div}>
                         <TextField
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
            </Fragment>
        )
    )
}

SignUp.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool
};
  
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

export default connect(mapStateToProps, { register })(SignUp);