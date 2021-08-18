import React from 'react';
import * as AiIcons from 'react-icons/ai';
//import '../scss/figure.scss';

function Figure(props){

    const deleteFigure = async (id)=>{
        console.log(id);
    }

    return(
        <div className="card">
            <div className="figure-item">
                <div className="figure-title">
                    <h6>{props.name}</h6>
                    <a className="figure-title delete" onClick={()=>deleteFigure(props.id)}><AiIcons.AiOutlineClose /></a>
                </div>
                <div className="figure-content">
                    {props.positions.map((item, index)=>{
                        return(
                            <div className={item ? "quadrate active" : "quadrate"}></div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Figure;