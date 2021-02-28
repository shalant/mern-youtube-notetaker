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

   const components = [
       <TextField
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />,
        <TextField
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setUsername(e.target.value)} />,
        <Button
            variant='contained'
            color='primary'
            onClick={() => authenticate()}
        >
            {action}
        </Button>
   ]

if(username) {
    //redirect to home page

}

return (
    <Grid container direction='row' item xs={12} justify= 'center' alignItems='center'>
        <Grid
            container
            direction='column'
            alignItems='stretch'
            justify='center'
            component={Card}
            item
            spacing={3}
            sx={8}
            md={4}
            style={{padding: '20px'}}
        >
            <Grid container item xs={12} justify='center'>
                <Typography variant='h3'>{action}</Typography>
            </Grid>
            {
                components.map(component => {
                    return (
                        <Grid container item direction='column' xs={12} alignItems='stretch'>
                            {component}
                        </Grid>
                    );
                })
            }
            {
                action ==='Sign In' ? 
                    <Link to='/signup'>Don't have an account? Sign Up</Link> :
                    <Link to='/login'>Already have an account? Sign In</Link>
            
            }
        </Grid>
    </Grid>
)

}

export default AuthForm;