
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from 'react-router-dom';

import style from './Detail.module.css'

import { DATA_ERRORS } from '../../Redux/Actions/actionType';
import { ModalErrores } from "../index";

import { getDetail, cleanDetail } from "../../Redux/Actions/actions";

const Detail = () => {

    const {id} = useParams();

    const dispatch = useDispatch();  

    const detail = useSelector(state=> state.detail);
    
    useEffect(() => {
        dispatch(cleanDetail(id));
        dispatch(getDetail(id));
    },[id]);

    const cierreModal = () => {
        dispatch({type:DATA_ERRORS, payload: {}});
    }

    return (
        <div className={style.containerDetail}>
            <ModalErrores cierreModal={cierreModal}/>
            {
                detail.createdInDb 
                ? <h2 className={style.source}>Data base Videogame</h2>
                : <h2 className={style.source}>Api Videogame</h2>
            }
             <div className={style.nameImage} > 
                    <div>
                        <h1 className={style.nameV}>{detail.name}</h1>
                        <img src={detail.image} alt="not found" className={style.imagen}/>
                    </div>
                    <div className={style.ratingRelease}>
                        <div className={style.primerPlano}>
                            <h2 className={style.h}>Rating: </h2>
                            <h3 className={style.name}>{detail.rating}</h3>
                        </div>
                    <div className={style.primerPlano}>
                        <h2 className={style.h}>Release Date: </h2>
                        <h3 className={style.name}>{detail.released}</h3>
                    </div>    
                    </div>
                         
            </div>
            <div className={style.generosPlataformas}>
                
           
                <h2 className={style.h5a}>Genres:
                    <p className={style.genres}> 
                            {
                                detail.genres?.map((e)=>{
                                    return (
                                    <span  className={style.spanA}> "{e}" </span>
                                    )
                                })
                            }
                            </p>
                </h2>
                <h2
                 className={style.h5a}>Platforms:          
                            <p className={style.platforms}> 
                            {
                                detail.platforms?.map((e) => {
                                    return (
                                    <span className={style.spanA}> "{e}"</span>
                                    )
                                })
                            }
                            </p>
                </h2>
            </div>
           <div className={style.descripcion} >
                <h2>Description: <p className={style.descriptionDatos}>{<div dangerouslySetInnerHTML={{__html: detail.description}}/>}</p></h2>
            </div>

            <p className={style.boton}>
                <Link to='/home' className={style.link}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
        </svg></Link>
            </p>
        </div>
    )
};

export default Detail;