import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios';
import Menu from '../components/Menu';
import NewFigure from '../components/NewFigure';
import { Link, useParams } from 'react-router-dom';

function AddFigure(){

    const {id} = useParams();
    const sidebar = useSelector(state => state);
    const [modalidades, setModalidades] = useState([]);
    const [idGroup, setIdGroup] = useState("");
    const [positions, setPositions] = useState();
    const [name, setName] = useState();

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

    const getFigure = async ()=>{
        if(id){
            try {
                const { data } = await axios.get(`https://java.bocetos.co/gamered-0.0.1-SNAPSHOT/figure/${id}`,{
                    headers: {
                        Token: localStorage.getItem('token')
                    }
                });
                console.log(data.data)
                setPositions(data.data.positionsWinner);
                setName(data.data.name)
                setIdGroup(data.data.groupFigureId.id);
                console.log(name,'  ',positions)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const changeId = (e)=>{
        setIdGroup(e.target.value);
    }

    useEffect(()=>{
        getAllModalidades();
        getFigure();
    },[])

    return(
        <>
            <Menu />
            <div className={sidebar ? "navbar-container active sidebar-active" : "navbar-container"}>
                <div className="row-target">
                    <button className="btn-add"><Link to="/Figures"><AiIcons.AiOutlineArrowLeft /></Link></button>
                    <select onChange={changeId} value={idGroup}>
                        <option value="">...</option>
                        {modalidades.map((item,index)=>{
                            return <option value={item.id} key={index}>{item.name}</option>
                        })}
                    </select>
                    {idGroup ? <NewFigure idGroup={idGroup} positions={positions} name={name} id={id}/> : <></>}
                </div>
            </div>
        </>
    );
}

export default AddFigure;