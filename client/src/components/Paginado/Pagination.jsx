
import style from './Pagination.module.css'

 const Pagination = ({gamesPerPage, allGames, pagination, currentPage}) => {
    const pageNumber = [];

    for (let i = 1; i<=Math.ceil(allGames/gamesPerPage); i++) {
        pageNumber.push(i)
    }
    return (
        <nav className={style.navP}>
            <ul className={style.listUl}>
                {pageNumber?.map(number=>(
                    <li className={style.itemsNumbers}>
                        <button className={style.buttons} onClick={()=>pagination(number)}>
                            <span className={currentPage === number ? style.numberActual : null}>{number}</span>
                        </button>
                    </li>
                ))}     
            </ul>
           
        </nav>
    )
};

export default Pagination;
