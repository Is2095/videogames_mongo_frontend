
import axios from 'axios';
import { GET_ALLGAMES, CLEAR_FILTERS, GET_GENRES, FILTER_GENRES, ORDER_RATING, ORDER_ALPHA, GET_PLATFORMS,FILTER_GAMESAPIBD, CLEAN_DETAIL, GET_DETAIL, POST_VIDEOGAMES, DATA_ERRORS, GET_GAMES_BY_NAME, CLEAN_SEARCH, CLEAN_GAMES, GET_ALLGAMESBD } from './actionType';

export const getAllGames = () => {   
    return async function (dispatch) {

        const endpoint = '/videogames/';  
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({type: GET_ALLGAMES, payload: data})            
        } catch (error) {
           return dispatch({type:DATA_ERRORS, payload: error})
        }  
    };
}

export const getGenres = () => {
    return async function (dispatch) {
        const endponint = '/genres';
        try {
            const {data} = await axios.get(endponint)
            return dispatch({type: GET_GENRES, payload: data})
        } catch (error) {
            return dispatch({type:DATA_ERRORS, payload: error})
        }
    }
}

export const getPlatforms = () =>{
    return async function (dispatch) {
        const endponint = '/platforms';
        try {
            const {data} = await axios.get(endponint)
            return dispatch({type: GET_PLATFORMS, payload: data})
        } catch (error) {
            return dispatch({type:DATA_ERRORS, payload: error})
        }
    }
};

export const getDetail = (id) => {
    
    return async function (dispatch) {
        const endponint = `/videogames/${id}`
        try {
            const {data} = await axios.get(endponint)
            return dispatch({type: GET_DETAIL, payload: data})
        } catch (error) {
            return dispatch({type:DATA_ERRORS, payload: error})
        }
    }
};

export const getGamesByName = (name) => {
    return async function (dispatch) {
        const endponint = '/videogames/';
        try {
            const gamesName = await axios.get(`${endponint}?name=${name}`)
            if (gamesName.data.length === 0) dispatch({type:DATA_ERRORS, payload: {message: 'Videogame not found'}}) 
            else return dispatch({type: GET_GAMES_BY_NAME, payload: gamesName.data})
        } catch (error) {
            return dispatch({type:DATA_ERRORS, payload: error})           
        }
    }
};

export const postVideoGames = (form) => {
    const endponint = '/videogames';
    return async (dispatch) => {
        try {
            const createGame = await axios.post(endponint, form);
            
            alert('New game is created');
            return createGame
            
        } catch (error) {
            if(Object.keys(error.response.data).length !== 0) {
                dispatch( {type: DATA_ERRORS, payload: error.response.data})
            }else  {
                dispatch({type: DATA_ERRORS, payload: {message: error.message}})
            }
             
    }
   } 
}
export const cleanGames = () => { return {type: CLEAN_GAMES, payload: []}}

export const filterGamesApiBd =  (typeSource) => {
    return async function (dispatch) {
        let endpoint = '';
        if(typeSource === 'db')  endpoint = '/videogames/db'
        else if (typeSource === 'api') endpoint = '/videogames/api'
        else endpoint = '/videogames/';
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({type: GET_ALLGAMESBD, payload: data})            
        } catch (error) {
            if(error.response.data) return dispatch({type:DATA_ERRORS, payload: error.response.data})
            else return dispatch({type:DATA_ERRORS, payload: error})
        }  
    } 
}
export const filterGenres = (genre) => { return {type: FILTER_GENRES, payload: genre} };

export const orderRating = (typeOrder) => { return {type: ORDER_RATING, payload: typeOrder} };

export const orderAlpha = (typeOrder) => { return {type: ORDER_ALPHA, payload: typeOrder} };

export const clearFilters = () => { return {type: CLEAR_FILTERS} };

export const cleanDetail = () => { return {type: CLEAN_DETAIL} };

export const cleanSearch = () => { return {type: CLEAN_SEARCH, payload: {}}}