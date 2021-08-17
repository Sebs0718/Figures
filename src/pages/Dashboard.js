import React from 'react';
import {useHistory} from 'react-router-dom';
import Menu from '../components/Menu';

function Dashboard (){

    console.log(localStorage.token);

    const history = useHistory();

    const logout = ()=>{
        localStorage.removeItem('token');
        history.push('/');
    }

    return(
        <div>
            <Menu />
            <h1>Hello Word</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;