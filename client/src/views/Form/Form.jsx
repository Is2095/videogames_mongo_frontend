
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import style from './Form.module.css';

import  { cleanGames, postVideoGames } from "../../Redux/Actions/actions";
import  { getGenres, getPlatforms } from "../../Redux/Actions/actions";


import { DATA_ERRORS } from '../../Redux/Actions/actionType';

import { FormGenre, FormPlatforms, ModalErrores } from "../../components/index";

export const validate = (form) => {
    const error = {}
    const dateControl = document.querySelector('input[type="date"]')
    let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;
    const fecha = Date.now()

    if(form.name.length <= 3)  error.name ='The name requires a minimum of three charecteres';
    if(!validateUrl.test(form.image)) error.image = 'You must enter a URL';
    if(form.description.length>=255) error.description = 'The number of characters must not exceed 255'
    if(form.rating < 0) error.rating = 'The rating cannot be negative';
    if(form.rating > 100 ) error.rating = 'The rating cannot eceed the value 100';
    if(form.releasedDate.trim() === '')  error.releasedDate = 'You must choose a date';
    if(dateControl.valueAsNumber > fecha-10000000) error.releasedDate = 'The date must not be greater than the current';

    
    if(form.genres.length === 0) error.genres = 'You must enter at least one genre';
    if((form.genres.length) > 5 ) error.genres =  'Only 5 genres are allowed per Videogame';

     
    if(form.platforms.length === 0) error.platforms = 'You must enter at least one platform'
    if((form.platforms.length) > 10 ) error.platforms = 'Only 10 platforms are allowed per Videogame'

    return error;
}
export const validatePlatform = (platformSelect) => {
    const error = {}
    if(platformSelect.length === 0 ) console.log('vacio');
    return error
}

const Form = () => {

    const dispatch = useDispatch()

useEffect (() => {
    dispatch(getGenres())
    dispatch(getPlatforms())
},[dispatch])

    const [form, setForm] = useState({
        name: '',
        image: '',
        description: '',
        platforms: [],
        releasedDate: '',
        rating: 0,
        genres:[],
        createdInDb: true,
    });
    const [error, setError]=useState({
        name: '',
        image: '',
        description: '',
        platforms: '',
        releasedDate: '',
        rating: '',
        genres:'',
    });
    
    const [statusPlatform, setStatusPlatform] = useState(false); //estado del boton de seleccion true=seleccionado
    const [statusGenre, setStatusGenre] = useState(false);

    const changeInput = (e) => {
        const {name, value} = e.target;        
        setError(validate({...form, [name]:value}))
        setForm({...form, [name]:value})
    }

    const platformsHandle = (e) => {   
        e.preventDefault()
        if(!statusPlatform && !statusGenre) setStatusPlatform(!statusPlatform)
        if(statusPlatform && !statusGenre) setStatusPlatform(!statusPlatform)
        if(!statusPlatform && statusGenre) {
            setStatusGenre(!statusGenre)
            setStatusPlatform(!statusPlatform)
        }
        if(statusPlatform && statusGenre) setStatusPlatform(!statusPlatform)
    }
    
    const genreHandle = (e) => {
        e.preventDefault()
        if(!statusGenre && !statusPlatform) setStatusGenre(!statusGenre)
        if(statusGenre && !statusPlatform) setStatusGenre(!statusGenre)
        if(!statusGenre && statusPlatform) {
            setStatusPlatform(!statusPlatform)
            setStatusGenre(!statusGenre)
        }
        if(statusGenre && statusPlatform) setStatusGenre(!statusGenre)
    }
   
    const submitHandler = (e) => {
        e.preventDefault()
        
        if(!error.name && !error.image && !error.description && !error.rating && !error.releasedDate && !error.platforms && !error.genres) {
            if(form.name.length !== 0 && form.image.length !==0 && form.description.length !== 0 && form.releasedDate.length !== 0 && form.platforms.length !== 0 && form.genres.length !== 0) { 
         
               dispatch(postVideoGames(form))
               dispatch(cleanGames())
            }
            else dispatch({type:DATA_ERRORS, payload: {message: 'Enter all the required data'}})
        } else dispatch({type:DATA_ERRORS, payload: {message: 'Enter all the required data'}})
    }

    const cierreModal = () => {
        dispatch({type:DATA_ERRORS, payload: {}})
    }

    return (
        <div className={style.containerPrincipal}>
             <ModalErrores cierreModal={cierreModal}/>
            <form onSubmit={submitHandler} className={style.form}>
                <div className={style.cabezera}>
                    <h1 className={style.titulo}>Creating Videogames!!!</h1>
                    
                    <div className={style.volver}>
                        <Link to='/home'>
                            <button className={style.botonVolver}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
        </svg></button>
                        </Link>
                    </div>
                </div>

                <div className={style.container}>

                <div className={style.inputs}>
                    <div className={style.entradaName}>
                        <label className={style.containerLabel}>Name: </label>
                        <input type="text" name='name' value={form.name} placeholder='Videogame name...' onChange={changeInput} className={style.entrada}/>  
                        {error.name && <span className={style.error}>{error.name}</span>}   
                    </div>  
                    <div className={style.entradaName}>
                        <label className={style.containerLabel}>Rating: </label>
                        <input type="number" min={0} max={100} name='rating' value={form.rating} placeholder="Rating" onChange={changeInput} className={style.entrada}/>      
                        {error.rating && <span className={style.error}>{error.rating}</span>}   
                        
                    </div>
                    <div className={style.entradaName}>
                        <label className={style.containerLabel}>Released Date: </label>
                        <input type="date" name='releasedDate' value={form.releasedDate} placeholder="Released date..." onChange={changeInput} className={style.entrada}/>      
                        {error.releasedDate && <span className={style.error}>{error.releasedDate}</span>}   
                    </div>                             
                </div>
                <div className={style.inputs}>
                    <div className={style.entradaName}>
                         <label className={style.containerLabel}>Image: </label>
                        <input type="text" name='image' value={form.image} placeholder="Game image URL..." onChange={changeInput} className={style.entrada}/>      
                        {error.image && <span className={style.error}>{error.image}</span>}  
                    </div> 
                    <div className={style.entradaName}>
                        <label className={style.containerLabel}>Description: </label>
                        <textarea type="text" name='description' value={form.description} placeholder="Description..." onChange={changeInput} className={style.entrada}/>      
                        {error.description && <span className={style.error}>{error.description}</span>}   
                    </div>  
                </div>
                </div>
               
                <div className={style.botonesGeneralGP}>
                    <div className={style.a}>
                        <button className={style.botonesGP} onClick={platformsHandle}>Platforms: </button>
                        {error.platforms && <span  className={style.error}>{error.platforms}</span>}        
                    </div>
                    <div className={style.a}>
                         <button className={style.botonesGP} onClick={genreHandle}>Genres: </button>
                        {error.genres && <span className={style.error}>{error.genres}</span>}
                    </div>
                </div>

            
                    <FormPlatforms
                        statusPlatform={statusPlatform}
                        setStatusPlatform={setStatusPlatform}
                        form={form}
                        setForm={setForm}
                        setError={setError}
                        />
                    <FormGenre
                        statusGenre={statusGenre}
                        setStatusGenre={setStatusGenre}
                        form={form}
                        setError={setError}
                        setForm={setForm}
                    />

               
                <button type='submit' className={style.glowOnHover}>Create Videogame</button>
            </form>


    </div>
    )
};

export default Form;