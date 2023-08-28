
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import  { getAllGames, clearFilters, getGenres, getPlatforms } from "../../Redux/Actions/actions";

import style from './Home.module.css';

import { DATA_ERRORS } from '../../Redux/Actions/actionType';

import { Card, Filters, Pagination, SelectPerPage, ModalErrores, Search, Loading } from '../../components/index';

const Home = () => {

    const dispatch = useDispatch();
    const gamesRender = useSelector((state)=> state.games);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamePerPage] = useState(15); 
    const [otro, setOtro] = useState('')
    
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    
    const currentGames = gamesRender.slice(indexOfFirstGame, indexOfLastGame);
    
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);       
    }

    useEffect (() => {
        if(gamesRender.length === 0) {
            dispatch(getAllGames());
            dispatch(getGenres())
            dispatch(getPlatforms())
        }
    },[dispatch])

    const handlerClearFilters = () => {
        dispatch(clearFilters());
    }

    const cierreModal = () => {
        dispatch({type:DATA_ERRORS, payload: {}})
    }

    return (
        <div className={style.principal}>    
            <ModalErrores cierreModal={cierreModal}/>  
            { gamesRender.length === 0 
                ? (<Loading/>)
                : (
                    <div className={style.containerGeneral}>
                        <div className={style.pagination}>
                            <Pagination 
                                gamesPerPage={gamesPerPage}
                                allGames={gamesRender.length}
                                pagination={pagination}
                                currentPage={currentPage}
                                />
                            <SelectPerPage
                                setGamePerPage={setGamePerPage}
                            />
                        </div>
                        <div className={style.containerCardfFiltros}>
                            <div className={style.filtros}>
                                <Search/>
                                
                                <Filters
                                    setCurrentPage={setCurrentPage}
                                    setOtro={setOtro}
                                />
                                <button className={style.filterButton} onClick={handlerClearFilters}>Clear Filters</button>
                            </div>
                        
                            <div className={style.cards}>
                                {
                                currentGames.length !== 0 
                                ? currentGames?.map((ele) => {
                                        return (
                                            <div key={ele.id} className={style.card}>
                                                <Card
                                                id={ele.id || ele._id}
                                                name={ele.name}
                                                image={ele.image}
                                                rating={ele.rating}
                                                genres={ele.genres}
                                            />
                                            </div>                             
                                        )
                                    })
                                    : null
                                }
                            </div>
                        </div>
                    </div>          
                )
            }     
        </div>
    )
};

export default Home;
