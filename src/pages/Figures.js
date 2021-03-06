import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Menu from '../components/Menu';
import axios from 'axios';
import * as IoIcons from 'react-icons/io';
import * as AiIcons from 'react-icons/ai';
import Figure from '../components/Figure';
import {Link} from 'react-router-dom';


axios.interceptors.request.use(
    config => {
        config.headers.authorization = `${localStorage.token}`;
        return config
    },
    error =>{
        return Promise.reject(error);
    }
)

function Figures(){

    const [geometry, setGeometry] = useState([]);
    const [modalidades, setModalidades] = useState([]);
    const sidebar = useSelector(state => state);
    const [pags, setPags] = useState({
        pag1: true,
        pag2: false
    });

    const getAllFigures = async ()=>{
        try {
            const { data } = await axios.get('https://java.bocetos.co/gamered-0.0.1-SNAPSHOT/figure',{
                headers: {
                    Token: localStorage.getItem('token')
                }
            });
            setGeometry(data.data);
        } catch (error) {
           console.log(error)
        }
    }

    const getAllModalidades = async ()=>{
        try {
            const { data } = await axios.get('https://java.bocetos.co/gamered-0.0.1-SNAPSHOT/groupfigure',{
                headers: {
                    Token: localStorage.getItem('token')
                }
            });
            setModalidades(data.data);
        } catch (error) {
           console.log(error)
        }
    }

    const changePag = (e)=>{
        const pag = e.target.attributes.value.value;
        if(pag === "1"){
            setPags({
                pag1: true,
                pag2: false
            })

        }else{
            setPags({
                pag1: false,
                pag2: true
            })
        }
    }

    useEffect(()=>{
        getAllFigures();
        getAllModalidades();
    },[])


    return(
        <>
            <Menu />
            <div className={sidebar ? "navbar-container active sidebar-active" : "navbar-container"}>
                <div className="paginate">
                    <a className={pags.pag1 ? "pag selected" : "pag"} onClick={changePag} value="1">Figures</a>
                    <a className={pags.pag2 ? "pag selected" : "pag"} onClick={changePag} value="2">Modality Group</a>
                </div>
                <div className={pags.pag1 ? "row-target" : "row-target disable"}>
                    <button className="btn btn-add"><Link to="/AddFigures"><IoIcons.IoMdAdd /></Link></button>
                    <div className={sidebar ? "figure-container active" : "figure-container"}>
                        {geometry.map((item, index)=>{
                            return(
                                <Figure key={index} idGroup={item.groupFigureId.id} id={item.id} name={item.name} positions={item.positionsWinner} />
                            );
                        })}
                    </div>
                </div>
                <div className={pags.pag2 ? "row-target" : "row-target disable"}>
                    <div className="modalidades-container">
                        <button className="btn btn-add"><Link to="/AddGroup"><IoIcons.IoMdAdd /></Link></button>
                        <table>
                            <thead>
                                <tr>
                                    <th>Modality Name</th>
                                    <th>Opportunity</th>
                                    <th>Close on Launch</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modalidades.map((item,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.opportunity}</td>
                                            <td>{item.closeAt}</td>
                                            <td>
                                                <button className='btn btn-add'><Link to={`/EditGroup/${item.id}`}><AiIcons.AiFillEdit /></Link> </button>
                                                <button className='btn btn-add'><AiIcons.AiFillDelete /></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Figures;