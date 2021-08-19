import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Menu from '../components/Menu';
import { useSelector } from 'react-redux';
import ball from '../assets/img/ball.svg';

function Perfil(){

    const [user, setUSer] = useState({
        names: "",
        lastNames: "",
        username: "",
        rolDTO: {
            name: ""
        },
        createdAt: ""
    });

    const sidebar = useSelector(state => state);

    const getMyUser = async ()=>{
        try {
            const { data } = await axios.get('https://java.bocetos.co/userred-0.0.1-SNAPSHOT/myprofile',{
                headers: {
                    Token: localStorage.getItem('token')
                }
            });
            setUSer(data.data);
        } catch (error) {
           console.log(error)
        }
    }

    useEffect(()=>{
        getMyUser();
    },[])

    return(
        <>
            <Menu />
            <div className={sidebar ? "navbar-container active sidebar-active" : "navbar-container"}>
                <div className="card xl">
                    <div className="form-group">
                        <h3>Nombre</h3>
                        <h2>{user.names}</h2>
                        <img src={ball} alt="" className="ball"/>
                    </div>
                    <div className="form-group">
                        <h3>Apellidos</h3>
                        <h2>{user.lastNames}</h2>
                    </div>
                    <div className="form-group">
                        <h3>Nombre de usuario</h3>
                        <h2>{user.username}</h2>
                    </div>
                    <div className="form-group">
                        <h3>Rol</h3>
                        <h2>{user.rolDTO.name}</h2>
                    </div>
                    <div className="form-group">
                        <h3>Fecha de Creación</h3>
                        <h2>{user.createdAt}</h2>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Perfil;