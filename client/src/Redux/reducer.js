
import { useDispatch } from "react-redux";
import { CLEAR_FILTERS, GET_ALLGAMES, GET_GENRES, FILTER_GENRES, ORDER_ALPHA, ORDER_RATING, GET_PLATFORMS, FILTER_GAMESAPIBD,GET_DETAIL, CLEAN_DETAIL, POST_VIDEOGAMES, DATA_ERRORS, GET_GAMES_BY_NAME, CLEAN_SEARCH, CLEAN_GAMES, GET_ALLGAMESBD } from"./Actions/actionType";

const initialState = {
    games: [],
    allGames:[],
    genres:[],
    platforms: [],
    detail: {},
    dataErrors: {},
}
const reducer = (state = initialState, {type, payload}) => {

    
    switch (type) {
        
    case GET_ALLGAMES:
        return {
            ...state,
            games: payload,
            allGames: payload,
        }
    case GET_ALLGAMESBD:
        return {
            ...state,
            games: payload,
        }
    case GET_GENRES: 
        return {
            ...state,
            genres: payload
        }
    case GET_PLATFORMS: 
        return {
            ...state,
            platforms: payload
        }
    case GET_DETAIL:
        return {
            ...state,
            detail: payload, 
        }
    case GET_GAMES_BY_NAME:
        return {
            ...state,
            games: payload
        }
    case CLEAN_SEARCH:
        return {
            ...state,
            games: state.allGames
        }
    case CLEAR_FILTERS: 
        return {
            ...state,
            games: state.allGames
        }
    case CLEAN_DETAIL:
        return {
            ...state,
            detail: {}
        }
    case POST_VIDEOGAMES: 
        return {
            ...state,
        }

    case CLEAN_GAMES:
        return {
            ...state,
            games: payload
        }

    case DATA_ERRORS: 
        return {
            ...state,
            dataErrors: payload,
        }
            
    case FILTER_GAMESAPIBD: 
        let filterSource = [];
        if (payload === 'api') {
            filterSource = state.allGames.filter(e => !e.createdInDb);
        }else if (payload === 'db') {
            filterSource = state.allGames.filter(e=> e.createdInDb);
            if(filterSource.length ===0){}
        }else {
            filterSource = state.allGames;
        };
        return {
            ...state,
            games: filterSource
        }
    case FILTER_GENRES: 
        let filtered = payload === 'all' 
            ? state.games 
            : state.games.filter(e=>e.genres.some(e=>e===payload))
        if(filtered.length === 0) {
            filtered = state.allGames;
            alert('There are no game of the indicated geners') 
        }
        return {
            ...state,
            games: filtered
        }
    case ORDER_RATING: 
        let filterRating = payload === 'ascRating'
            ? state.games.sort((a,b) => a.rating - b.rating)
            : state.games.sort((a,b) => b.rating - a.rating);
        return {
            ...state,
            games: filterRating
        }
    case ORDER_ALPHA: 
        if(payload === 'ascAlpha'){
            return {
                ...state,
                games: state.games.sort((a,b) => a.name.localeCompare(b.name))
            }
        };
        if(payload === 'desAlpha') {
            return {
                ...state,
                games: state.games.sort((a,b) => b.name.localeCompare(a.name))
            }
        }

        
        default:
           return {...state}
    }
};

export default reducer;