import React, { useEffect, useState } from 'react';
import './App.css';

//Importing material UI tools
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { BrowserRouter, Route, Switch } from 'react-router-dom';


//Contents
import NewsLetterDialog from './Content/NewsLetterDialog'

//Background Image
import centerlg from './img/Logo.png';


//Components
import Footer from './Components/Footer';
import NavBar from './Components/NavBar'
// import PrivateRoute from './Components/routing/PrivateRoute';

import Login from './scenes/Login'
import Home from './scenes/Home'
import Blog from './scenes/Blog'
import ViewBlog from './scenes/ViewBlog'
import Shop from './scenes/Shop'
import Product from './scenes/Product';
import Checkout from './scenes/Checkout';
import About from './scenes/About';
import SignUp from './scenes/SignUp';
import ResetPassword from './scenes/ResetPassword';

import { Provider } from 'react-redux';
import  store  from './store';

import setAuthToken from './utils/setAuthToken'
import { loadUser } from './redux/actions/auth'


const theme = createMuiTheme({
  palette:{
      primary: {
          main: 'rgba(233, 232, 230, 0.0)'
      },
      secondary: {
          main: '#fff'
      },
      background:{
        // default: '#171A40'
      }
  },
  typography: {
     "fontFamily": "\"Nunito\", \"Kalam\",\"Dancing Script\",\"Pacifico\", \"Oswald\",\"GreatVibes\", \"Roboto\", \"Helvetica\", \"Arial\", cursive",
    //  "fontSize": 14,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500
  },
})
// `url(${bg})`

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${centerlg})`, 
    overflow: 'hidden',
    backgroundSize: 'cover',
    textAlign: 'center',
    backgroundPosition:  'center',
    // overflow: 'hidden'
  },
  root2: { 
    background: 'rgba(255,255,255, 0.8)' ,
    backgroundSize: 'cover',
  },
  grow: {
    flexWrap: 1,
  }, 
  // rgba(125, 193, 98, 0.3)
  // #07C751'
  logo: {
    width: 500,
    height: 500
  },
}));

const responsiveTheme = responsiveFontSizes(theme)

if (localStorage.token) {
  setAuthToken(localStorage.token);
}



function App() {
  const classes= useStyles()

  const [openDialog, setOpenDialog] = useState(false)

  // const [subscribe, setSubscribed] = useState(JSON.parse(localStorage.getItem("subscribed")))

  const [visited, setVisited] = useState(JSON.parse(localStorage.getItem("visited")))

  // const [dimensions, setDimensions] = React.useState({ 
  //   height: window.innerHeight,
  //   width: window.innerWidth
  // })
 
  // function handleResize() {
  //   setDimensions({       
  //      height: window.innerHeight,
  //      width: window.innerWidth
  //    })
  // }

  useEffect( () => {
    if (visited){
      console.log("visited")
    }else{
      const timer = setTimeout(() => {
        setOpenDialog(true)
      }, 6000); //after 6 seconds
    }
  }, [])

  const handleClose = () => {
    setOpenDialog(false);
    localStorage.setItem("visited", JSON.stringify(true))
  };
  
  useEffect(() => {
    store.dispatch(loadUser()).catch(console.log("Guest"))
  }, []);
  
  return (
    <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider  theme={responsiveTheme}>
            <div className = {classes.root} style={{ backgroundAttachment: 'fixed' }} >
              <Box className={classes.root2}>
              {/*<DevNavBar/>*/}
                <NavBar />
                <Switch>
                  <Route exact path='/' render={(props) => <Home {...props}/>}/>
                  <Route  path='/product/:idx' render={(props) => <Product {...props}/>}/>
                  <Route  path='/login' component={Login}/>
                  <Route  path='/register' component={SignUp}/>
                  <Route  path='/shop' render={(props) => <Shop {...props}/>}/>
                  <Route  path='/blogs' render={(props) => <Blog {...props}/>}/>
                  <Route  path='/blog/:idx' render={(props) => <ViewBlog {...props}/>}/>
                  <Route  path='/checkout' render={(props) => <Checkout {...props}/>}/>
                  <Route  path='/aboutus' render={(props) => <About {...props}/>}/>
                  <Route  path='/resetpassword/:token?' render={(props) => <ResetPassword {...props}/>}/>
                  
                  {/* <PrivateRoute exact path='/admin/addproduct' component={AddBlog}/> */}
                  {/* <PrivateRoute exact path='/admin/addblog' component={AddBlog}/> */}
                </Switch>
                <NewsLetterDialog open={openDialog} handleClose={handleClose} />
                <Footer/>
              </Box>
            </div>
          </ThemeProvider>
        </BrowserRouter>
    </Provider>
  );
}

export default App;
