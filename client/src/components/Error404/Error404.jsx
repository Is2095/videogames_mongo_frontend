
import image404 from '../../imagenes/e0a5656a76cafc96228c1ce6759a6083_w200.webp'
import style from './Error404.module.css';

const Error404 = () => {
    return (
        <div className={style.principal}>
            <div className={style.secundario}>
                <h1 className={style.errors}>Error...</h1>
                <img  className={style.imagen} src={image404} alt="" />
            </div>
           
        </div>
        
    )
}

export default Error404;
