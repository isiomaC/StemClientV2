// import logo from './logo.svg';
import './App.css';
import logo from '../src/img/InFiniC.png';
import background from '../src/img/Logo.png'
import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    root : {},
    styles : {
        backgroundImage: `url(${background})`, 
            backgroundAttachment: 'fixed',
            overflow: 'hidden',
            width: '100vw',
            height: '100vh',
            backgroundSize: 'cover',
            textAlign: 'center',
            backgroundPosition:  'center'
        }
}))

// const apiUrl = 'https://inphinityapi.herokuapp.com/api' 
// const apiUrl = 'http://localhost:5000/api' 
const apiUrl = 'https://shrouded-hollows-95980.herokuapp.com/api'


function Page() {

   const classes = useStyles()

  const [form, setForm] = useState({email: ''})

  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
   
    try{
      const formData = {
        email: form.email ? form.email : '',
      }

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      if (formData !== ''){
        console.log("here")
        const res = await axios.post(`${apiUrl}/newsletter`, formData, config)
        console.log(res.data)

        if (res.data){
          setSubscribed(true)
        }
      }
    }catch(e){
      console.log(Object.keys(e))
      console.log(e.config)
      console.log(e.request)

    }
  }

  const handleChange = (e) => {
    setForm({...form,
      [e.target.name] : e.target.value
    })
  }

  return (
    <div className="App">
        <div className={classes.styles}>
          <div className="App2">

            {subscribed ? (
              <p>
                Yaaaay!!!! you subscribed
              </p>
            ) : (
              <>
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                </header>
                <div>
                  <h3 className="headerText"> Coming Soon!!!!</h3>
                  <p> Subscribe to be the first to know when we launch and get exclusive offers</p>
                  <div>
                    <form method="POST" onSubmit={handleSubmit}>
                      <input type="text" id="email" name="email" onChange={handleChange}/>
                      {/* <input type="password" id="pwd" name="password" onChange={handleChange}/> */}
                      <button type="submit"> Subscribe </button>
                    </form>
                  </div>
                </div>
              </>
            )}
            {/*  */}
          </div>
        </div>
    </div>
  );
}

export default Page;
