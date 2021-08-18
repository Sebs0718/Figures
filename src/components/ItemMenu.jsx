import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';

export const ItemMenu = [
    {
        title: 'Home',
        path: '/Dashboard',
        icon: <FaIcons.FaClipboard />,
        cName: 'nav-text'
    },
    {
        title: 'Perfil',
        path: '/Perfil',
        icon: <FaIcons.FaUserCircle />,
        cName: 'nav-text'
    },
    {
        title: 'Figures',
        path: '/Figures',
        icon: <BsIcons.BsBoundingBoxCircles />,
        cName: 'nav-text'
    }
]