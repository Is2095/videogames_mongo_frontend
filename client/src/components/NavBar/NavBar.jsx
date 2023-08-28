
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
    const navLink = ({isActive}) => (isActive ? style.active : style.disable)
    return (
        <div className={style.principal}>
            <div className={style.mainContainer}>
                <NavLink to='/create' className={navLink}>CREATE VIDEOGAME</NavLink>          
                <NavLink to='/home' className={navLink}>HOME</NavLink>
                <NavLink to='/' className={navLink}>EXIT</NavLink>
            </div>
        </div>
       
    )
};

export default NavBar;