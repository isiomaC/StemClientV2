//Material UI COmponents
import { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'

//Icons
import CancelIcon from '@material-ui/icons/Cancel';

import Grid from '@material-ui/core/Grid';

import React from 'react'

import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

const useStyles = makeStyles(theme => ({
    root: {
      overflow: 'hidden',
      backgroundSize: 'cover',
      textAlign: 'center',
      backgroundPosition:  'center',
    },
    root2: { 
      background: 'rgba(255,255,255, 0.8)' ,
      backgroundSize: 'cover',
    },
    new: {
        display: 'flex',
        margin: '2px 4px',
        justifyContent: 'space-between',
        height: 40,
    }, 
    leftTextContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '12px',
        fontFamily: 'Big Shoulders Display'
    },
    rightTextContainer: {
        margin: '10px 0',
        
    }
  }));

const NewsLetterDialog = ({ open, handleClose }) => {
    const classes= useStyles()

    const [email, setEmail] = useState('')

    const handleChange= (e)=> {
        console.log(e.target.value)
        setEmail(e.target.value)
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()
    
        let form = {}
        const config ={
            headers: {
                "Content-Type":"application/json"
            }
        }
        try{
            if (email !== ''){
                form.email = email
            }else{
                alert('email address field is empty')
                return
            }
            
            const res = await axios.post(`${apiUrl}/newsletter`, form, config)
    
            if (res.data){
                if (res.data.success){
                    alert('Sign up Complete') 
                    setEmail('')
                    localStorage.setItem("visited", JSON.stringify(true))
                    //dispatch(setVisited)
                }
            }
    
        }catch(e){
    
            if(e.response.data.subscribed){
                alert('Already Subcribed')
                localStorage.setItem("visited", JSON.stringify(true))
                setEmail('')
            }else if (e.response.data.errors[0].msg){
                alert(e.response.data.errors[0].msg)
                setEmail('')
            }
        }
    }

    //TODO : Sign up for NewsLetter
    return (
        <Box>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                    },
                }}
            >
                <Box style={{ display: 'flex'}}>
                    <Grid container style={{ }} >
                        <Grid item className={classes.leftTextContainer} style={{ background: 'rgb(67, 82, 78)', color: 'white' }} xs >
                            <Container className={classes.leftTextContainer}>
                                <Typography align="center" variant="h4" >STAY IN THE LOOP WITH OUR COLLABORATION WITH NATURE</Typography>
                            </Container>
                        </Grid>
                        <Grid item style={{   display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center', 
                                                background: 'white'  }} xs >
                            <Container className={classes.rightTextContainer}>
                                <Typography align="center" variant="h6" style={{ marginBottom: '5px'}}>
                                    Subscribe to our Newsletter to get <b>10%</b> 
                                    OFF your <i style={{ textDecoration: 'underline'}}>FIRST</i> order</Typography>
                                    
                                <Typography align="center" style={{ fontSize: '0.7em', marginBottom: '5px'}}> Get Hair and SkinCare tips, BTS, Sales, and New Nature Collab drops </Typography>
                            
                                <Paper component='form' className={classes.new}>
                                    <InputBase
                                        className={classes.input}
                                        placeholder="Email Address"
                                        value={email}
                                        type='email'
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'newsletter' }}
                                    />
                                    <Button style={{ background: 'rgba(151, 212, 136, 0.6)'}} size="small" variant="contained" onClick={handleSubmit}>
                                        SUBSCRIBE
                                    </Button>
                                </Paper>
                            </Container>
                        </Grid>
                    </Grid>
                    <CancelIcon style={{ color: 'rgb(211 ,62, 52)', cursor: 'pointer' }} onClick={handleClose}/>
                </Box>
            </Dialog>
        </Box>
    )
}


export default NewsLetterDialog