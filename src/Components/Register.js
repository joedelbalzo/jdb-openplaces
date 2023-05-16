
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  register } from '../store';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const Register = ()=> {
  const [username, setUsername ] = useState('');
  const [password, setPassword ] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _register = async(ev)=> {
    ev.preventDefault();
    const credentials = {
      username,
      password
    };
    try {
      dispatch(register(credentials));
      navigate('/home');
    }
    catch(ex){
      console.log(ex)
    }
  };

  return (
    <>
    <div id="loginPage">
    <h2>Register</h2>
    <form onSubmit={ register }>
    <TextField 
          size='large'
          sx={{fontSize: "2rem", paddingBottom:"1rem"}}
          label="username" 
          name = 'new username'
          autoComplete = "username"
          variant="outlined" 
          onChange={ ev => setUsername(ev.target.value) }/>

    <TextField 
          size='large'
          sx={{fontSize: "2rem", paddingBottom:"1rem"}}
          id="filled-password-input"
          autoComplete='current-password'
          label="password" 
          name = 'new password'
          type="password"
          variant="outlined" 
          onChange={  ev => setPassword(ev.target.value) }/> 

    <Button 
        type="submit"
        onClick={ _register } 
        style={{
          fontSize: "1.8rem",
          padding: "1rem"
          }}> 
        Register
        </Button>

    </form>
    </div>
    
    </>
  );
};

export default Register;  