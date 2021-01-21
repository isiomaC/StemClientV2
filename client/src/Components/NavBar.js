import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';

//Material ui components
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import Box from '@material-ui/core/Box';
import { red } from '@material-ui/core/colors'

import QuickShop from '../Components/QuickShop'

import Fade from '@material-ui/core/Fade';

import getOrderTotal from '../utils/getOrderTotal'

//Transition elements
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

//Icons
import logo from '../img/InFiniC.png'
import HandleScroll from '../Content/HandleScroll'
import { logout } from '../redux/actions/auth'



const options = [
    {
        index: 0,
        name: 'Shop',
        selector: '#featureddestination',
        link: '/shop'
    },
    {
        index: 1,
        name:'Blog',
        selector: '#blogdestination',
        link: '/blogs'
    },
    {
        index: 2,
        name:'AboutUs',
        selector: '#aboutusdestination',
        link: '/aboutus'
    }
]

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
        background: 'rgb(255,255,255)',
        [theme.breakpoints.up('sm')]: { },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      background: 'rgba(255,255,255,0.7)'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    logo: {
      height: 42,
      width: 110
    },
    nested: {
      marginLeft: 20
    },
    navbarLinks: {
        textDecoration: "none",
        margin: '0 24px',
        cursor: 'pointer',
        color: 'inherit',
        '&:hover': {
            color : red[400]   
        }
    },
    MenuItemList:{ },
    logoContainer: {
        [theme.breakpoints.up('lg')]: {
            marginLeft: 80 
        },
        flex:1,
        alignContent: 'flex-start',
        // alignItems: 'flex-start',
        display: 'flex'
    },
    paperCart: {
        overflow:'scroll',
        width: '33vw',
        background: '#d2f5e3',
        marginTop: '30px',
        // height: '80vh',
        zIndex: 99999,
        [theme.breakpoints.down('md')]: {
            width: '50vw'
        },
        [theme.breakpoints.down('xs')]: {
            width: '100vw'
        }
    },
    arrow: {
        position: 'absolute',
        color: red[500],
        background: red[500],
        fontSize: 7,
        width: '3em',
        height: '3em',
        '&::before': {
          content: '""',
          margin: 'auto',
          display: 'block',
          width: 0,
          height: 0,
          borderStyle: 'solid',
        }
    }
}));

const NavBar = (props) => {
    // const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));
    
    const { isAuthenticated, logout, user, shoppingcart } = props
    const classes = useStyles();
    // const theme = useTheme();

    const ITEM_HEIGHT = 100

    const [mobileOpen, setMobileOpen] = React.useState(null);
    const open = Boolean(mobileOpen)

    const history = useHistory();

    const adminLink = process.env.REACT_APP_ADMIN_LINK

    const handleClick = (event) => {
        //N:B - event.view very handy...
        // console.log(event.view)
        setMobileOpen(event.currentTarget)
    }

    const goToCheckOut = () => {
        history.push('/checkout')
    }

    const handleClose = (event) => {
        
        setMobileOpen(null)
       
    }

   
    React.useEffect(() => {
       
    }, [])

    

    return (
        <Box style={{ flexGrow: 1}}>
            <HandleScroll {...props}>
                <AppBar elevation={0} position="fixed" className={classes.appBar}>
                    <Box component="div" style={{ display: 'flex', background: 'black', height: '20', justifyContent: 'flex-end'}}>
                        <div style={{ color:'white', marginRight: 100 }}> 
                            {isAuthenticated === true ? (
                                user.isAdmin === true ? (
                                    <>
                                        <a href={adminLink} style={{ color: '#fff',textDecoration: "none"}}>
                                            <Typography className={classes.navbarLinks} variant="caption">admin</Typography>
                                        </a>
                                        <Typography onClick={logout} className={classes.navbarLinks} variant="caption">log out</Typography>
                                    </>
                                ):(
                                    <Typography onClick={logout} className={classes.navbarLinks} variant="caption">log out</Typography>
                                )
                            ) : (
                                <>
                                    <a href="/login" style={{ color: '#fff',textDecoration: "none"}}>
                                        <Typography className={classes.navbarLinks} variant="caption">log in</Typography>
                                    </a>
                                    <a href="/register" style={{ color: '#fff', textDecoration: "none"}}>
                                        <Typography className={classes.navbarLinks} variant="caption">sign up</Typography>
                                    </a>
                                </>
                            )}
                        </div>
                    </Box>
                    <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className={classes.logoContainer}>
                            <a href="/" style={{ textDecoration: "none"}}>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="end">
                                    <img src={logo} alt="logo" className={classes.logo}  />
                                </IconButton>
                            </a>
                        </div>
                        <Hidden xsDown>
                            <div style={{ display: 'flex', marginRight: 50}}>
                                <a href="/shop" className={classes.navbarLinks}>
                                    <Typography variant="h6" >
                                        Shop
                                    </Typography>
                                </a>
                                <a href="/blogs" className={classes.navbarLinks}>
                                    <Typography className={classes.navbarLinks} variant="h6" >
                                        Blog
                                    </Typography>
                                </a>
                                <a href="/aboutus" className={classes.navbarLinks}>
                                    <Typography className={classes.navbarLinks} variant="h6" >
                                        About Us
                                    </Typography>
                                </a>
                                {/* <Typography className={classes.navbarLinks} variant="h6" >
                                    Search
                                </Typography> */}
                                <QuickShop shoppingcart={shoppingcart} goToCheckOut={goToCheckOut} getOrderTotal={getOrderTotal} />
                            </div>
                        </Hidden> 
                        <Hidden smUp>
                            <Box component='div'>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <QuickShop shoppingcart={shoppingcart} goToCheckOut={goToCheckOut} getOrderTotal={getOrderTotal} />
                                    <IconButton
                                        style={{ marginLeft: '10px'}}
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick}>
                                        <SubjectRoundedIcon style={{color:'black'}}  />
                                    </IconButton>
                                </div>
                                <Menu
                                    id="long-menu" anchorEl={mobileOpen} keepMounted open={open} onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            maxHeight: ITEM_HEIGHT * 4.5,
                                            width: '100%',
                                            backgroundColor:'rgb(236, 247, 230)',
                                            color: 'black'
                                        },
                                    }}
                                    TransitionComponent={Fade}>
                                        {options.map(option => (
                                            <MenuItem name={'menu-' + option.name} className={classes.MenuItemList} key={option.index} selected={option === ''} onClick={handleClose}>
                                                    {/* <option.image className={classes.MenuItemListIcons}/>  */}
                                                        <a href={`${option.link}`} style={{ textDecoration: "none", color:'black'}}>{option.name}</a>
                                            </MenuItem>
                                        ))}
                                </Menu>
                                </Box>
                        </Hidden>  
                    </Toolbar>
                </AppBar> 
            </HandleScroll>
            <Toolbar />
        </Box>
    )
}

NavBar.propTypes = {
    isAuthenticated : PropTypes.bool,
    logout: PropTypes.func,
    user: PropTypes.object,
    shoppingcart: PropTypes.object,
    produc: PropTypes.object
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    user : state.auth.user,
    shoppingcart : state.shoppingcart,
})

export default connect(mapStateToProps, { logout })(NavBar);