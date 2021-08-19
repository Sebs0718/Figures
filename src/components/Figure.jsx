import React from 'react';
import * as AiIcons from 'react-icons/ai';
import {Link} from 'react-router-dom';

function Figure(props){

    const deleteFigure = async (id)=>{
    }

    return(
        <div className="card">
            <div className="figure-item">
                <div className="figure-title">
                    <h6>{props.name}</h6>
                    <a className="figure-title delete" onClick={()=>deleteFigure(props.id)}><AiIcons.AiOutlineClose /></a>
                    <a className="figure-title delete"><Link to={`/EditFigure/${props.id}`}><AiIcons.AiFillEdit /></Link></a>
                </div>
                <div className="figure-content">
                    {props.positions.map((item, index)=>{
                        return(
                            <div key={index} className={item ? "quadrate active" : "quadrate"}></div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Figure;