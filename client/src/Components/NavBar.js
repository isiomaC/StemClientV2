import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom';

//Material ui components
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import Box from '@material-ui/core/Box';
import { red, green } from '@material-ui/core/colors'
import Badge from '@material-ui/core/Badge';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';

import QuantityStepper from '../scenes/Checkout/content/QuantityStepper'
import approximatePrice from '../utils/approximatePrice'


import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

//Transition elements
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

//Icons
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import ShoppingCart from '../Components/ShoppingCart'

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
        link: '/blog'
    },
    {
        index: 2,
        name:'AboutUs',
        selector: '#aboutusdestination',
        link: '/aboutus'
    },
    {
        index: 3,
        name:'Search',
        selector: '#searchdestination'
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
        height: '80vh',
        [theme.breakpoints.down('md')]: {
            width: '50vw'
        },
        [theme.breakpoints.down('xs')]: {
            width: '100vw'
        }
    },
    checkOutBtn:{
        background:'rgba(255,255,255)',
        color: 'rgb(255,0,0)', 
        marginBottom: '10px'
    },
    cart: {
        cursor: 'pointer',
        '&:hover': {
            color : green[400]   
        }
    },
    orderTotal:{
        height: '10%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    checkOutContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'flex-end'
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
    // const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const { isAuthenticated, logout, user, shoppingcart } = props
    const classes = useStyles();
    const theme = useTheme();

    const ITEM_HEIGHT = 100

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openPopper, setOpenPopper] = React.useState(false)

    const arrowRef = React.useRef()

    const [mobileOpen, setMobileOpen] = React.useState(null);
    const open = Boolean(mobileOpen)

    const [openNested, setOpenNested] = React.useState(false);

    const history = useHistory();

    const adminLink = 'https://inphinityxx1.herokuapp.com/'

    const handleClick = (event) => {
        //N:B - event.view very handy...
        // console.log(event.view)
        setMobileOpen(event.currentTarget)
    }

    const showCart = (event) => {
        // console.log(event.view)
        setAnchorEl(event.currentTarget);
        setOpenPopper(prev => !prev);
    }

    const handleClickAway = () => {
        setOpenPopper(false);
    };

    const goToChechOut = () => {
        setOpenPopper(false)
        history.push('/checkout')
    }

    const handleClose = (event) => {
        
        setMobileOpen(null)
        // console.log(document.querySelector('#shopdestination').offsetTop)
        const innerText = event.target.innerText

        if (innerText === 'Shop'){
            const projectdestination = document.querySelector('#shopdestination')
           
            //go to shop page
        }else if(innerText === 'Blog'){
            const aboutdestination = document.querySelector('#blogdestination')
          
            //go to blog page
        }else if(innerText === 'AboutUs'){
            const contactdestination = document.querySelector('#aboutusdestination')
           
            //go to about us
        }else if(innerText === 'Search'){
            const contactdestination = document.querySelector('#searchdestination')
           
            //open to search field 
        }else{
            setMobileOpen(null)
        }
    }


    const getOrderTotal = () => {
        var total = 0
        shoppingcart.forEach(item => {
            const itemTotal = item.price * item.quantity
            total = total + parseFloat(itemTotal)
        });
        return total 
    }

    React.useEffect(() => {
        // console.log(shoppingcart.length)
        // console.log(arrowRef.current)

    }, [])

    // console.log(arrowRef.current)


    return (
        <Box style={{ flexGrow: 1}}>
            <HandleScroll {...props}>
                <AppBar elevation={0} position="fixed" className={classes.appBar}>
                    <Hidden xsDown>
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
                    </Hidden>
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
                                <a href="/blog" className={classes.navbarLinks}>
                                    <Typography className={classes.navbarLinks} variant="h6" >
                                        Blog
                                    </Typography>
                                </a>
                                <a href="/aboutus" className={classes.navbarLinks}>
                                    <Typography className={classes.navbarLinks} variant="h6" >
                                        About Us
                                    </Typography>
                                </a>
                                <Typography className={classes.navbarLinks} variant="h6" >
                                    Search
                                </Typography>
                                
                                <ClickAwayListener onClickAway={handleClickAway}>
                                <div >
                                    <Badge badgeContent={shoppingcart.length} color="error">
                                        <ShoppingCartIcon className={classes.cart} onClick={showCart} />
                                    </Badge>
                                    <Popper 
                                        open={openPopper} 
                                        anchorEl={anchorEl} 
                                        placement='bottom'
                                        transition 
                                        modifiers={{
                                        flip: {
                                          enabled: true,
                                        },
                                        preventOverflow: {
                                          enabled: true,
                                          boundariesElement: 'scrollParent',
                                        },
                                        arrow: {
                                          enabled: true,
                                        //   element: arrowRef,
                                        },
                                      }}>
                                    {({ TransitionProps }) => (
                                        <Fade {...TransitionProps} timeout={350}>
                                            {/* <span className={classes.arrow} ref={arrowRef} /> */}
                                            <Paper elevation={1} className={classes.paperCart}>
                                                <Box style={{ display: 'flex', textAlign: 'center', flexDirection: 'column'}}>
                                                    <Container>
                                                        <h4>Shopping Cart</h4>
                                                        <p>({shoppingcart.length} items)</p>
                                                    </Container>
                                                </Box>
                                                {shoppingcart.map((item, index) =>(
                                                    <Container key={index}>
                                                        <Divider/>
                                                        <ShoppingCart cart={item} key={index} />
                                                    </Container>
                                                ))}
                                                <Divider/>
                                                <Container className={classes.orderTotal}>
                                                    <Typography style={{ height: '50%'}}>
                                                        Order Total: €{approximatePrice(getOrderTotal())} 
                                                    </Typography>
                                                </Container>
                                                <Divider style={{ marginBottom: '20px'}}/>
                                                <Container className={classes.checkOutContainer}>
                                                    <Button 
                                                     disabled= {shoppingcart.length === 0 && true} 
                                                     variant='contained' 
                                                     onClick={()=> goToChechOut()} 
                                                     className={classes.checkOutBtn}> 
                                                        CheckOut
                                                    </Button>
                                                </Container>
                                            </Paper>
                                        </Fade>
                                    )}
                                    </Popper>
                                 </div>
                                </ClickAwayListener>
                            </div>
                        </Hidden> 
                        <Hidden smUp>
                            <Box component='div'>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    
                                    <ClickAwayListener onClickAway={handleClickAway}>
                                    <div >
                                        <Badge badgeContent={shoppingcart.length} color="error">
                                            <ShoppingCartIcon onClick={showCart} />
                                        </Badge>
                                        <Popper 
                                            open={openPopper} 
                                            anchorEl={anchorEl} 
                                            placement='bottom'
                                            transition 
                                            modifiers={{
                                                flip: { enabled: true,},
                                                preventOverflow: {
                                                    enabled: true,
                                                    boundariesElement: 'scrollParent',
                                                },
                                                arrow: {
                                                    enabled: true,
                                                    // element: arrowRef,
                                                },
                                            }}
                                        >
                                        {({ TransitionProps }) => (
                                            <Fade {...TransitionProps} timeout={350}>
                                                {/* <span className={classes.arrow} ref={setArrowRef} /> : null} */}
                                                <Paper elevation={2} className={classes.paperCart}>
                                                    <Box style={{ display: 'flex', textAlign: 'center', flexDirection: 'column'}}>
                                                        <Container>
                                                            <h4>Shopping Cart</h4>
                                                            <p>({shoppingcart.length} items)</p>
                                                        </Container>
                                                    </Box>
                                                    {shoppingcart.map((item, index) =>(
                                                        <Container key={index}>
                                                            <Divider/>
                                                            <ShoppingCart cart={item} key={index} />
                                                        </Container>
                                                    ))}
                                                    <Divider/>
                                                    <Container className={classes.orderTotal}>
                                                        <Typography style={{ height: '50%'}}>
                                                            Order Total: €{getOrderTotal()}
                                                        </Typography>
                                                    </Container>
                                                    <Divider style={{ marginBottom: '20px'}}/>
                                                    <Container component='div' className={classes.checkOutContainer}>
                                                        <Button
                                                         disabled={shoppingcart.length === 0 && true}
                                                         variant='contained' 
                                                         onClick={()=> goToChechOut()} 
                                                         className={classes.checkOutBtn}> 
                                                            CheckOut
                                                         </Button>
                                                    </Container>
                                                </Paper>
                                            </Fade>
                                        )}
                                        </Popper>
                                    </div>
                                    </ClickAwayListener>
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
                                                        <a href={`${option.link}`} style={{ textDecoration: "none"}}>{option.name}</a>
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
    shoppingcart: PropTypes.arrayOf(PropTypes.object),
    produc: PropTypes.object
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    user : state.auth.user,
    shoppingcart : state.shoppingcart,
})

export default connect(mapStateToProps, { logout })(NavBar);