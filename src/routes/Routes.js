import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Figures from '../pages/Figures';
import '../scss/main.scss';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' render={()=>{
                    return localStorage.token ? <Redirect to='/Dashboard' /> : <Login />
                }} />
                <Route exact path='/Dashboard' render={()=>{
                    return !localStorage.token ? <Redirect to='/' /> : <Dashboard />
                }} />
                <Route exact path='/Figures' render={()=>{
                    return !localStorage.token ? <Redirect to='/' /> : <Figures />
                }} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;