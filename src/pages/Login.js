import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import logo from '../assets/img/logo.png';


//import '../scss/login.scss';

function Login() {

    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const history = useHistory();

    const getUser = (e) =>{
        setUsernameValue(e.target.value);
    }

    const getPassword = (e) =>{
        setPasswordValue(e.target.value);
    }

    const login = async (e) =>{
        e.preventDefault();
        try {
            const obj = {username: usernameValue, password: passwordValue};
            const { data } = await axios.post("https://java.bocetos.co/userred-0.0.1-SNAPSHOT/auth", obj);
            localStorage.setItem('token', data.Authorization)
            localStorage.setItem('uId', data.uId)
            history.push('/Dashboard');
        } catch (error) {
            alert('Incorrect User or Password')
            console.error(error)
        }
    }

    return (
        <div className="backGround">
            <div className="container">
                <div className="target">
                    <img src={logo} alt="" />
                    <div className="row">
                        <form onSubmit={login}>
                            <input type="text" placeholder="Username" className="input" onChange={getUser} value={usernameValue} />
                            <input type="password" placeholder="Password" className="input" onChange={getPassword} value={passwordValue} />
                            <button type="submit" className=" btn btn-login submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;