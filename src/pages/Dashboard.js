import React from 'react';
import { useSelector } from 'react-redux';
import Menu from '../components/Menu';

function Dashboard (){

    const sidebar = useSelector(state => state);

    return(
        <>
            <Menu />
            <div className={sidebar ? "navbar-container active" : "navbar-container"}>
                <h1>Hello Word</h1>
            </div>
        </>
    );
};

export default Dashboard;