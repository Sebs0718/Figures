import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios';
import Menu from '../components/Menu';
import {Link} from 'react-router-dom';
import { Checkbox, FormControlLabel } from '@material-ui/core';

function AddGroup(){

    const sidebar = useSelector(state => state);
    const [name, setName] = useState('');
    const [opportunity, setOpportunity] = useState('');
    const [close, setClose] = useState('');
    const [chek, setChek] = useState(false);

    const getName = (e)=>{
        setName(e.target.value)
    }

    const getOpportunity = (e)=>{
        setOpportunity(e.target.value)
    }

    const getClose = (e)=>{
        setClose(e.target.value)
    }

    const getCheck = (e)=>{
        setChek(!chek);
    }

    const save = async ()=>{
        try {
            const obj = {
                "name": name, 
                "opportunity": opportunity, 
                "closeAt": close,
                "selectFigure": chek
            }
            await axios.post('https://java.bocetos.co/gamered-0.0.1-SNAPSHOT/figure',{
                headers:{
                    Token: localStorage.getItem('token')
                },
                body: obj
            });

        } catch (error) {
            alert('Error al guardar');
            console.error(error)
        }
    }

    return(
        <>
            <Menu />
            <div className={sidebar ? "navbar-container active" : "navbar-container"}>
                <div className="row-target">
                    <button className="btn-add"><Link to="/Figures"><AiIcons.AiOutlineArrowLeft /></Link></button>
                    <div className="row-target sm">
                        <input type="text" className="input label" placeholder="Nombre de Modalidad" value={name} onChange={getName}/>
                        <input type="number" className="input label" placeholder="oportunidad" value={opportunity} onChange={getOpportunity}/>
                        <input type="number" className="input label" placeholder="Cerrar al Lanzar" value={close} onChange={getClose}/>
                        <FormControlLabel
                            control={
                            <Checkbox
                                onChange={getCheck}
                                name="checkedB"
                                color="primary"
                            />
                            }
                            label="Seleccione figura ?"
                        />
                        {name !== "" && opportunity !== "" && close !== "" ? <button onClick={save} className="btn-add save"><AiIcons.AiOutlineSave /></button> : <button className="btn-add save disable"></button>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddGroup;