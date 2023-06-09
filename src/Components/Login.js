// react imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
// mui imports
import { Button, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

//component imports

//store imports
import { attemptLogin } from '../store';

const Login = ()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [passwordError, setPasswordError] = useState('');


  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });


  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const onChange = ev => {
    setCredentials({...credentials, [ ev.target.name ]: ev.target.value });
  };

  const login = (ev)=> {
    ev.preventDefault();
    try{
      dispatch(attemptLogin(credentials));
      console.log('dispatching')
      navigate('/home');
    }
    catch(ex){
        console.log('incorrect')
        setPasswordError('Incorrect username or password. Please try again.');
        console.log(ex)
    }
  };
  return (
    <div id="loginPage">
      <h2>Login</h2>
      <form onSubmit={ login }>

        <TextField 
          size='large'
          sx={{fontSize: "2rem", paddingBottom:"1rem"}}
          label="username" 
          name = 'username'
          autoComplete = "username"
          variant="outlined" 
          value={ credentials.username } 
          onChange={ onChange }/>
      
          <TextField 
          size='large'
          sx={{fontSize: "2rem", paddingBottom:"1rem"}}
          id="filled-password-input"
          autoComplete='current-password'
          label="password" 
          name = 'password'
          type="password"
          variant="outlined" 
          value={ credentials.password } 
          onChange={ onChange }/>

{passwordError && <p style={{ color: 'red', fontSize: ".8rem" }}>{passwordError}</p>}

              
        <Button 
        type="submit"
        onClick={ login } 
        style={{
          fontSize: "1.8rem",
          padding: "1rem"
          }}> 
        Login
        </Button>

        <Button 
        type="submit"
        style={{
          fontSize: "1.4rem",
          padding: "1rem",
          }}> 
        <Link to={'/register'} style={{textDecoration: "none",  textTransform: 'capitalize' }}>Create New User</Link>
        </Button>

        


        {/* <Button 
          type="submit" 
          style={{fontSize: "1.2rem"}}> 
            <a href={`https://github.com/login/oauth/authorize?client_id=${window.client_id}`} style={{ textDecoration: 'none'  }}>
            Login with Google (doesn't work yet...)
            </a>
        </Button>

        <Button 
          type="submit" 
          style={{fontSize: "1.2rem"}}> 
            <a href={`https://github.com/login/oauth/authorize?client_id=${window.client_id}`} style={{ textDecoration: 'none'  }}>
            Login with Github
            </a> */}
        {/* </Button> */}
      </form>
    </div>
  );
};

export default Login;
