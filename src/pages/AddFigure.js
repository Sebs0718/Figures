import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios';
import Menu from '../components/Menu';
import NewFigure from '../components/NewFigure';
import {Link} from 'react-router-dom';

function AddFigure(){

    const sidebar = useSelector(state => state);
    const [modalidades, setModalidades] = useState([]);
    const [idGroup, setIdGroup] = useState();

    const getAllModalidades = async ()=>{
        try {
            const { data } = await axios.get('https://java.bocetos.co/gamered-0.0.1-SNAPSHOT/groupfigure',{
                headers: {
                    Token: localStorage.getItem('token')
                }
            });
            setModalidades(data.data);
            setIdGroup(modalidades[0].id);
        } catch (error) {
           console.log(error)
        }
    }

    const changeId = (e)=>{
        setIdGroup(e.target.value);
    }

    useEffect(()=>{
        getAllModalidades();
    },[])

    return(
        <>
            <Menu />
            <div className={sidebar ? "navbar-container active" : "navbar-container"}>
                <div className="row-target">
                    <button className="btn-add"><Link to="/Figures"><AiIcons.AiOutlineArrowLeft /></Link></button>
                    <select onChange={changeId}>
                        <option value="">...</option>
                        {modalidades.map((item,index)=>{
                            return <option value={item.id} key={index}>{item.name}</option>
                        })}
                    </select>
                    {idGroup ? <NewFigure idGroup={idGroup} /> : <></>}
                </div>
            </div>
        </>
    );
}

export default AddFigure;