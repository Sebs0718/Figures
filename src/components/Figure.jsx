import React, {useState} from 'react';
import * as AiIcons from 'react-icons/ai';
import Modal from 'react-modal';
import NewFigure from './NewFigure';

function Figure(props){

    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState();

    const deleteFigure = async (id)=>{
    }

    const closeModal = ()=>{
        setIsOpen(false);
    }

    const editFigure = (id)=>{
        setId(id);
        setIsOpen(true);
    }

    return(
        <div className="card">
            <Modal isOpen={isOpen} onRequestClose={closeModal}>
                <a className="figure-title delete" onClick={closeModal}><AiIcons.AiOutlineClose /></a>
                <h1>Edit</h1>
                <div className="container modal">
                    <NewFigure id={id} idGroup={props.idGroup} name={props.name} positions={props.positions}/>
                </div>
            </Modal>
            <div className="figure-item">
                <div className="figure-title">
                    <h6>{props.name}</h6>
                    <a className="figure-title delete" onClick={()=>deleteFigure(props.id)}><AiIcons.AiOutlineClose /></a>
                    <a className="figure-title delete" onClick={()=>editFigure(props.id)}><AiIcons.AiFillEdit /></a>
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