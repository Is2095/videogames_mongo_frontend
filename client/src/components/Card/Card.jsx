
import style from "./Card.module.css"
import { NavLink } from "react-router-dom";

const Card = ({id, name, image, genres, rating}) => {
    return (
        <div className={style.card}>
            <NavLink className={style.navlinks} to={`/videoGames/${id}`}>
                <img src= {image} alt={name} className={style.image} width='200px'/>
                <h3>Name: {name}</h3>
                <div >
                    <h5>Rating: {rating}</h5>
                  <p>
                    Genres: 
                    {
                        genres?.map((e) => {
                            return (
                                <span className={style.genres}>
                                    {e}
                                </span>
                            )
                        })
                    }
                  </p>
                </div>                
            </NavLink>            
        </div>
    )
};

export default Card;