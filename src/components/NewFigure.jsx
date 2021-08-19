import React, {useState} from 'react';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function NewFigure(props){

    const nombre = props.name ? props.name : '';
    const array = props.positions ? props.positions : [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];

    const history = useHistory();
    const [geometry, setGeometry] = useState(array);
    const [name, setName] = useState(nombre);

    const getName = (e)=>{
        setName(e.target.value);
    }

    const changeState = (e)=>{
        const indice = e.target.value;
        const newGeometry = geometry.map((item,index)=>{
            if(index == indice){
                return !item 
            }else{
                return item 
            }
        })

        setGeometry(newGeometry);
    }

    const save = async ()=>{
        try {
            const obj = {"figureName": name, "idFigureGroup": props.idGroup, "positions": geometry };
            await axios.post('https://java.bocetos.co/gamered-0.0.1-SNAPSHOT/figure',obj,{
                headers: {
                    Token: localStorage.getItem('token')
                }
            });
            history.push('/Figures');
        } catch (error) {
            alert('Save Failed');
            console.error(error)
        }
    }

    const update = async ()=>{
        try {
            const obj = { "idFigureGroup": props.idGroup, "figureName": name, "positions": geometry }
            await axios.put(`https://java.bocetos.co/gamered-0.0.1-SNAPSHOT/figure/${props.id}`,obj,{
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
        <div className="card-new">
            <div className="figure-item">
                <div className="figure-title">
                    <input type="text" placeholder="Name" className="input label" onChange={getName} value={name}  />
                    {name !== "" ? <button onClick={props.name ? update : save} className="btn-add save"><AiIcons.AiOutlineSave /></button> : <button className="btn-add save disable"></button>}
                </div>
                <div className="figure-content">
                    {geometry.map((item,index) =>{
                        return(
                            <div key={index} className={item ? "quadrate new active" : "quadrate new"}>
                                {props.id ? <></> :<button className="btn-change" value={index} onClick={changeState}></button>} 
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default NewFigure;