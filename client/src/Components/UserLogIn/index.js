import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import api from '../../api/index';
import {useNavigate} from 'react-router-dom';

import '../../styles/index.css'

//MUI Components
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const inputStyles = {
  marginTop : '1vh',
  marginBottom : '1vh'
}

function Login() {

  //we use navigate to once logged in navigate to /dashboard where the user can see all their information
  const navigate = useNavigate()

  //state that updates on change to on submit send to back end for authentication
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  

  //handles password change
  const handlePasswordInputChange = async e =>{
    const password = e.target.value;
    setPassword(password) 
}

  //handles username change
const handleUsernameInputChange = async e =>{
    const username = e.target.value;
    setUsername(username)
}

//this function is used to call the 'login' function from the 'apis' folder that logs the user in
  const loginHandler =  () =>{
    const userName  = username;
    const passWord = password;
    api
      .login(userName, passWord)
      .then(res =>{
        navigate('/dashboard')
      })
  }

  return <div className='login'>
            <h2>Welcome to Crypto Watch</h2>
            <form className='logInForm'>
                <TextField 
                  style={inputStyles}
                  type='text'
                  placeholder='Username'
                  onChange={handleUsernameInputChange}
                />
                <TextField 
                  style={inputStyles}
                  type='password'
                  placeholder='Password'
                  onChange={handlePasswordInputChange}
                />
            </form>
            <div className='loginBtnDiv'>
              <Button
                variant='contained'
                onClick={loginHandler}>
                  Log In
              </Button>

              <Button>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>

         </div>;
}

export default Login;
