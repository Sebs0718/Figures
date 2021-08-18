import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { ItemMenu } from './ItemMenu';
import { IconContext } from 'react-icons';
import logo from '../assets/img/logo.png';

//import '../scss/menu.scss';

function Menu(){

    const sidebar = useSelector(state => state);
    const dispatch = useDispatch();

    const showSidebar = ()=> dispatch({type: "change"});

    const Logout = ()=> localStorage.removeItem('token')

    return(
        <>
            <IconContext.Provider value={{color: 'black'}}>
                <div className={sidebar ? 'navbar active' : 'navbar'}>
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <h2>SALA Verano 22</h2>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items">
                        <li className="navbar-toggle">
                            <Link to="#">
                                <img src={logo} alt="" />
                            </Link>
                        </li>
                        <li className='nav-text'>
                            <h5>Super Admin</h5>
                        </li>
                        {ItemMenu.map((item, index)=>{
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                        <li className='nav-text'>
                            <Link to="/" onClick={Logout}>
                                <RiIcons.RiLogoutBoxLine />
                                <span>Logout</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
};

export default Menu;