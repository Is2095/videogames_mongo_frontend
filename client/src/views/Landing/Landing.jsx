
import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css'

const Landing = () => {
    return (
        <div className={style.landing}>
            <p className={style.landingCartel}>Welcome to VIDEOGAME API</p>
            <Link to='/home'>
                <button className={style.landingButton}>Start...</button>
            </Link>
        </div>
    )
};

export default Landing;
