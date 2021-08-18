import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Menu from '../components/Menu';
import axios from 'axios';
import * as IoIcons from 'react-icons/io';
import Figure from '../components/Figure';


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
        if(pag == 1){
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
            <div className={sidebar ? "navbar-container active" : "navbar-container"}>
                <div className="paginate">
                    <a className={pags.pag1 ? "pag selected" : "pag"} onClick={changePag} value="1">Figuras</a>
                    <a className={pags.pag2 ? "pag selected" : "pag"} onClick={changePag} value="2">Grupo de Modalidades</a>
                </div>
                <div className={pags.pag1 ? "row-target" : "row-target disable"}>
                    <button className="btn btn-add"><IoIcons.IoMdAdd /></button>
                    <div className={sidebar ? "figure-container active" : "figure-container"}>
                        {geometry.map((item, index)=>{
                            console.log(item)
                            return(
                                <Figure id={item.id} name={item.name} positions={item.positionsWinner} />
                            );
                        })}
                    </div>
                </div>
                <div className={pags.pag2 ? "row-target" : "row-target disable"}>
                    <div className="modalidades-container">
                        <button className="btn btn-add"><IoIcons.IoMdAdd /></button>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre de la Modalidad</th>
                                    <th>Oportunidad</th>
                                    <th>Cerrar al lanzar</th>
                                    <th>Acciones</th>
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
                                                <button className='btn'>eliminar</button>
                                                <button className='btn'>Editar</button>
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