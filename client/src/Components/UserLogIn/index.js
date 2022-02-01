import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import api from '../../api/index';
import {useNavigate} from 'react-router-dom';


function Login() {

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  console.log(password)
  
  const handlePasswordInputChange = async e =>{
    const password = e.target.value;
    setPassword(password) 
}

const handleUsernameInputChange = async e =>{
    const username = e.target.value;
    setUsername(username)
}

  const loginHandler =  () =>{
    const userName  = username;
    const passWord = password;
    api
      .login(userName, passWord)
      .then(res =>{
        navigate('/dashboard')
      })
  }

  return <div>
      <form>
          <label>Username:</label>
          <input 
            type='text'
            onChange={handleUsernameInputChange}
          />
          <label>Password:</label>
          <input 
            type='password'
            onChange={handlePasswordInputChange}
          />
      </form>
      <button onClick={loginHandler}>Log In</button>

      <div>
        <Link to="/signup">Signup</Link>
      </div>
  </div>;
}

export default Login;
