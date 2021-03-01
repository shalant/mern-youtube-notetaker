import React, {useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import CustomAppBar from './components/appbar/AppBar';
import { AuthContext } from './components/auth/auth';
import AuthForm from './components/auth/AuthForm';
import PrivateRoute from './components/route_types/PrivateRoute';
import HomePage from './homepage/Home';

function App() {

  const existingToken = localStorage.getItem('token') || '';
  const existingUsername = localStorage.getItem('username') || '';
  const [authToken, setAuthToken] = useState(existingToken);
  const [username, setUsername] = useState(existingUsername);

  const setUserName = (data) => {
    if(!data) {
      localStorage.removeItem('username');
      setUsername();
    } else {
      localStorage.setItem('username', data);
      setUsername(data);
    }
  }

  const setToken = (data) => {
    if(!data) {
      localStorage.removeItem('token');
      setAuthToken();
    } else {
      localStorage.setItem('token', JSON.stringify(authToken));
      setAuthToken(data);
    }
  }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken, username, setUserName: setUserName }}>
      <div className='App'>
        <BrowserRouter>
          <CustomAppBar />
          <Switch>
            <Route exact path='/' component={AuthForm} />
            <Route exact path='/login' component={AuthForm} />
            <Route exact path='/signup' component={AuthForm} />
            <PrivateRoute exact path='/home' component={HomePage} />
          </Switch>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
    
  )

}

export default App;
