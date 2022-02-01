import React,{useState} from 'react';
import api from '../../api/index';
import {useNavigate} from 'react-router-dom';


//MUI Components
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const inputStyles = {
    marginTop : '1vh',
    marginBottom : '1vh'
  }

function SignUp() {

    //we use navigate to once signed up navigate to home where the user can login
    const navigate = useNavigate()

    //state used to send to back end for the creation of the user
    //the error is to be able to display an error to the user if there's one on the back end
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    

      //handles username change

    const handleUsernameInputChange = e =>{
        const username = e.target.value;
        setUsername(username)
    }

    //handles password change

    const handlePasswordInputChange = e =>{
        const password = e.target.value;
        setPassword(password) 
    }

    //handles user submission and creates user
    const submitHandler =  () =>{
        const userName = username
        const passWord = password
        const favorites = {"Bitcoin": false,
                           "Ethereum": false,
                           "Doge": false
                          }

         api.signup(userName, passWord, favorites)
        .then(res =>{
            setUsername('')
            setPassword('')
            navigate('/')
            
        }).catch((err) => {
            if(err){
                setError(true)
            }
            })
    }

  return <div>
            <Button variant='contained' onClick={()=> navigate('/')}>Back</Button> 
            <div className='signUpFormDiv'>
                <form className='singUpForm'>
                    <TextField 
                        style={inputStyles}
                        placeholder='Username'
                        required
                        type='text' 
                        onChange={handleUsernameInputChange}
                    />
                    <TextField
                        style={inputStyles}
                        placeholder='Password' 
                        type='password' 
                        onChange={handlePasswordInputChange}
                    />
                </form>
                <div className='signUpErrBtn'>
                    {error
                        && 
                    <p>Password Requirements:
                        <ul>
                            <li>Needs to have at least 6 chars.</li>
                            <li>Must contain at least one number.</li>
                            <li>Have one lowercase and one uppercase letter.</li>
                        </ul>
                    </p>}
                    <Button variant='outlined'  onClick={submitHandler}>Sign Up</Button>
                </div>

            </div>
     </div>;
}
export default SignUp;