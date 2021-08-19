import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios';
import Menu from '../components/Menu';
import { Link, useParams } from 'react-router-dom';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

function AddGroup(){
    
    const {id} = useParams();
    const history = useHistory();
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

    const getGroups = async ()=>{
        if(id){
            try {
                const { data } = await axios.get(`https://java.bocetos.co/gamered-0.0.1-SNAPSHOT/groupfigure/${id}`,{
                    headers: {
                        Token: localStorage.getItem('token')
                    }
                });
                console.log(data.data)
                setOpportunity(data.data.opportunity);
                setName(data.data.name)
                setClose(data.data.closeAt);
                setChek(data.data.selectFigure)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(()=>{
        getGroups();
    },[])

    const save = async ()=>{
        try {
            const obj = {
                "name": name, 
                "opportunity": opportunity, 
                "closeAt": close,
                "selectFigure": chek
            }
            await axios.post('https://java.bocetos.co/gamered-0.0.1-SNAPSHOT/groupfigure',obj,{
                headers:{
                    Token: localStorage.getItem('token')
                },
            });
            history.push('/Figures');
        } catch (error) {
            alert('Save Failed');
            console.error(error)
        }
    }

    const update = async ()=>{
        try {
            const obj = {
                "name": name, 
                "opportunity": opportunity, 
                "closeAt": close,
                "selectFigure": chek
            }
            await axios.put(`https://java.bocetos.co/gamered-0.0.1-SNAPSHOT/groupfigure/${id}`,obj,{
                headers: {
                    Token: localStorage.getItem('token')
                }
            });
            history.push('/Figures');
        } catch (error) {
            alert('Update Failed');
            console.error(error)
        }
    }

    return(
        <>
            <Menu />
            <div className={sidebar ? "navbar-container active sidebar-active" : "navbar-container"}>
                <div className="row-target">
                    <button className="btn-add"><Link to="/Figures"><AiIcons.AiOutlineArrowLeft /></Link></button>
                    <div className="row-target sm">
                        <input type="text" className="input label" placeholder="Modality Name" value={name} onChange={getName}/>
                        <input type="number" className="input label" placeholder="Opportunity" value={opportunity} onChange={getOpportunity}/>
                        <input type="number" className="input label" placeholder="Close on Launch" value={close} onChange={getClose}/>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={chek}
                                onChange={getCheck}
                                name="checkedB"
                                color="primary"
                            />
                            }
                            label="Picks Figure?"
                        />
                        {name !== "" && opportunity !== "" && close !== "" ? <button onClick={id ? update :save} className="btn-add save"><AiIcons.AiOutlineSave /></button> : <button className="btn-add save disable"></button>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddGroup;