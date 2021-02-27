import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography, Button, TextField } from '@material-ui/core';

const AuthForm = (props) => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [action, setAction] = useState('sign in');

   const authenticate = async () => {
       const basePath = 'api/auth/'; //server-side path
       let url = basePath;

       if(action ==='sign in') {
           url += 'login';
       }
       console.log(url);

       const response = await fetch(url, {
           method: 'POST',
           headers: {'content-type': 'application/json'},
           body: JSON.stringify({username, password})
       });

       const json = await response.json();
       if(response.ok) {
           setAuthToken(json.token);
           setUsername(json.user.username);
       } else {
           alert(json.msg);
       }
   }
    
   useEffect(() => {
       if(props.action) {
           setAction(props.action);
       } else {
           if(props.location.pathname === '/signup') {
               setAction('sign up');
           } else {
               setAction('sign in');
           }
       }
   }, [props])

   

}

export default AuthForm;