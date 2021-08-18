import React, {useState, useEffect} from 'react';
import Menu from '../components/Menu';
import axios from 'axios';
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

    useEffect(()=>{
        getAllFigures();
        console.log('esto es el geometry: ',geometry)
    },[])


    return(
        <>
            <Menu />
            <div>
                <div>
                    <button className="btn">+</button>
                </div>
                <div className="figure-container">
                    {geometry.map((item, index)=>{
                        console.log(item)
                        return(
                            <Figure id={item.id} name={item.name} positions={item.positionsWinner} />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Figures;