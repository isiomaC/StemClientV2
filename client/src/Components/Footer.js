import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import axios from 'axios'

//Components
import Typography  from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';

//Logo Image
import logo from '../img/InFiniC.png'

import InstagramIcon from '@material-ui/icons/Instagram';
import PinterestIcon from '@material-ui/icons/Pinterest';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import PublicIcon from '@material-ui/icons/Public';
import FacebookIcon from '@material-ui/icons/Facebook';

import PoliciesDialog from './PoliciesDialog'

const apiUrl = process.env.REACT_APP_API_URL

const useStyles = makeStyles(theme => ({
    stickToBottom: {
        borderTop: `5px solid ${theme.palette.divider}`,
        height: '40%',
        width: '100%',
        bottom: 0,
        color:'black',
        background: 'rgba(204, 246, 200, 0.8)' //'rgba(151, 212, 136, 0.6)',
    },
    Icons: {
        margin: '20px',
        cursor: 'pointer',
        background: 'rgba(255, 255, 255, 0.3)'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    new: {
        display: 'flex',
        margin: '2px 4px',
        justifyContent: 'space-between',
        height: 40,
    }, 
    boxStyl: {
        display: 'inline-block',
    },
    typo:{
        margin: 20
    },
    logo: {
        height: 100,
        width: 200,
        cursor: 'pointer'
    },
    bottom:{
        margin: '0px 20px',
        textDecoration: 'none',
        color: 'grey',
        cursor: 'pointer'
    }
}));

const Footer = () => {
    const classes = useStyles();
    const subText = "SUBSCRIBE TO OUR NEWSLETTER";
    const tt = "Be One of the First to know about new releases";

    const [email, setEmail] = useState('')
    const [open, setOpen] = useState(false)
    const [section, setSection] = useState('')

    const handleChange= (e)=> {
        setEmail(e.target.value)
    }

    const handleOpen = (sect)=> {
        setSection(sect)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setSection('')
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
                }
            }

        }catch(e){

            if(e.response.data.subscribed){
                alert('Already Subcribed')
                setEmail('')
            }else if (e.response.data.errors[0].msg){
                alert(e.response.data.errors[0].msg)
                setEmail('')
            }
        }
    }

    return (
        <Box component="div" className={classes.stickToBottom}>
            <Grid className={classes.boxStyl} >
                <Typography className={classes.typo}>{subText}</Typography>
                <Typography className={classes.typo}>{tt}</Typography>
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
            </Grid>
            <Box order={2} align='center' style={{ display: 'flex', justifyContent: 'center'}}> 
                <Avatar className={classes.Icons}><PinterestIcon style={{color: 'rgba(100, 0, 0, 0.5)'}}/></Avatar>
                <Avatar className={classes.Icons}> <FacebookIcon style={{color: 'rgba(0, 0, 180, 0.5)'}} /> </Avatar>
                <Avatar className={classes.Icons}> <TwitterIcon style={{color: 'rgba(50, 0, 100, 0.5)'}}/> </Avatar>
                <Avatar className={classes.Icons}> <InstagramIcon style={{color: 'rgba(40, 0, 0, 0.5)'}}/> </Avatar>
            </Box>
            <Box display='flex' justifyContent='center' style={{ marginTop: '30px', marginBottom: '30px'}}>
                <Link to={'/'} >
                    <img src={logo} alt="logo" className={classes.logo}  />
                </Link>
            </Box>
            <Box style={{  marginTop: '30px'  }} display='flex' justifyContent='center' color='textSecondary' component="div">
                <Hidden xsDown>
                   <Typography style={{ color: 'grey',  margin: '0px 20px',}} variant="caption" > &copy; 2020 jfk</Typography>
                   <div onClick={e => handleOpen('Privacy')}><Typography variant="caption" className={classes.bottom}> Privacy </Typography></div>
                   <div onClick={e => handleOpen('Shipping')}><Typography variant="caption" className={classes.bottom} > Shipping&Gurantee</Typography></div>
                   <div onClick={e => handleOpen('Returns')}><Typography variant="caption" className={classes.bottom}> Returns </Typography> </div>
                   <div onClick={e => handleOpen('Terms')}><Typography variant="caption" className={classes.bottom}> Terms&Conditions</Typography></div>
                   {/* <div onClick={e => handleOpen('Cookies')}><Typography variant="caption" className={classes.bottom}> Cookies Policy</Typography></div> */}
                   <Typography style={{  color: 'grey',  margin: '0px 20px', }} variant="caption"> Websites by jfkmo3s</Typography>
                   {open && <PoliciesDialog open={open} handleClose={handleClose} section={section}/>}
                </Hidden>
            </Box>
        </Box>
    )
}

export default Footer;