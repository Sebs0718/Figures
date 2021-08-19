import React from 'react';
import { useSelector } from 'react-redux';
import Menu from '../components/Menu';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as TiIcons from 'react-icons/ti';

function Dashboard (){

    const sidebar = useSelector(state => state);

    return(
        <>
            <Menu />
            <div className={sidebar ? "navbar-container active sidebar-active" : "navbar-container"}>
                <div className="row-target">
                    <div className="card md">
                        <Link to="/Figures">
                            <button className="btn-change">
                                <TiIcons.TiThLargeOutline/>
                                <h1>Figures</h1>
                            </button>
                        </Link>
                    </div>
                    <div className="card md">
                        <Link to="/Perfil">
                            <button className="btn-change">
                                <FaIcons.FaUserAlt/>
                                <h1>Perfil</h1>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;