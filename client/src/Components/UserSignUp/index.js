import React,{useState} from 'react';
import api from '../../api/index';
import {useNavigate} from 'react-router-dom';

function SignUp() {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    
    const handleUsernameInputChange = async e =>{
        const username = e.target.value;
        setUsername(username)
    }


    const handlePasswordInputChange = async e =>{
        const password = e.target.value;
        setPassword(password) 
    }

    const submitHandler =  () =>{
        console.log(username, password)
        const userName = username
        const passWord = password
        const favorites = {"Bitcoin": true,
                           "Ethereum": true,
                           "Doge": true
                          }

         api.signup(userName, passWord, favorites)
        .then(res =>{
            console.log(res)
            setUsername('')
            setPassword('')
            navigate('/')
            
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
        <button onClick={submitHandler}>Sign Up</button>
     </div>;
}

export default SignUp;
