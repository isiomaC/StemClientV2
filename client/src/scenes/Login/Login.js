import React, { Fragment, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../redux/actions/auth';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Spinner from '../../Components/layout/Spinner';
import InputAdornment from '@material-ui/core/InputAdornment'
import LockIcon from '@material-ui/icons/Lock'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import Visibility from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ValidateEmail from '../Checkout/utils/ValidateEmail'


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
  header: {
    marginTop: '30px'
  },
  headerText: {},
  div: {},
  btn: {
    '&:hover': {
      color: 'red',
      background: 'white'
    }
  },
  linkSignUP:{
    margin: theme.spacing(1)
  },
}))


const Login = ({ alert, login, isAuthenticated, user , loading}) => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false
  });

  const [errors, setErrors] = useState(null)

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData;
  const classes = useStyles()

  const onChange = e =>{
    setFormData({ ...formData, 
        [e.target.name]: e.target.value 
      });
    
    setErrors({ ...errors,
      [e.target.name]: null
    })
  }

  const handleClickShowPassword = () => {
    setShowPassword(showPassword => !showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (email === '' && password === ''){
      setErrors({
        password: 'password field is empty',
        email: 'email field is empty'
      })
      return
    }
    if (email === ''){
      setErrors({...errors,
        email: 'email field is empty'
      })
      return
    }else if(ValidateEmail(email) === false){
      setErrors({...errors,
        email: 'Please include a valid email'
      })
      return
    }

    if(password === '' || !password){
      setErrors({...errors,
        password: 'please input valid password'
      })
      return
    }

    const formDataObject = {
      username: email,
      password: password,
    }

    console.log(formDataObject)

    try {
      await login(formDataObject);
      //history.push('/dashboard')

    }catch(e){
      console.log(e)
    }
  };

  if (isAuthenticated ) {
    if(user){      
      return <Redirect to={{
        pathname:'/',
      }}/>
    }
  }
  
  return loading === true ? (
    <Spinner />
  ): (
    <Fragment>
      <h2 className={classes.header}>Log In</h2>
      <Typography className={classes.headerText}>
        <i className='fas fa-user' /> Sign Into Your Account
      </Typography>
      {alert.length !== 0 && <Typography style={{ fontSize: '0.9rem', color: 'red'}}>{alert[0].msg}</Typography>}
      <form className={classes.root} onSubmit={e => onSubmit(e)}>
        <div className={classes.div}>
          <TextField
              error={(errors && errors.email) && true}
              helperText={(errors && errors.email) && errors.email}
              id="outlined-textarea"
              label="email"
              placeholder="email"
              type="text"
              name ="email"
              value={email}
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
            error={(errors && errors.password) && true}
            helperText={(errors && errors.password) && errors.password}
            id="outlined-textarea"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            name="password"
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
        <Button variant="outlined" className={classes.btn} type='submit' value='Login' disableElevation>
          submit 
        </Button>
      </form>
      <Typography component='p' className={classes.linkSignUP}>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </Typography>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  loading: PropTypes.bool,
  alert: PropTypes.array,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  loading: state.auth.loading,
  alert: state.alert
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
