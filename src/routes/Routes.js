import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Figures from '../pages/Figures';
import '../scss/main.scss';
import AddFigure from '../pages/AddFigure';
import AddGroup from '../pages/AddGroup';
import Perfil from '../pages/Perfil';

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
                <Route exact path='/AddFigures' render={()=>{
                    return !localStorage.token ? <Redirect to='/' /> : <AddFigure />
                }} />
                <Route exact path='/AddGroup' render={()=>{
                    return !localStorage.token ? <Redirect to='/' /> : <AddGroup />
                }} />
                <Route exact path='/Perfil' render={()=>{
                    return !localStorage.token ? <Redirect to='/' /> : <Perfil />
                }} />
                <Route exact path='/EditFigure/:id' render={()=>{
                    return !localStorage.token ? <Redirect to='/' /> : <AddFigure />
                }} />
                <Route exact path='/EditGroup/:id' render={()=>{
                    return !localStorage.token ? <Redirect to='/' /> : <AddGroup />
                }} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;