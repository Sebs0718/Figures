import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/Dashboard' component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;