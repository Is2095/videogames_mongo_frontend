
import style from './SelectPerPage.module.css'
const SelectPerPage = ({setGamePerPage}) => {
    return (
        <div className={style.principal}>
            <select className={style.select} onChange={(e)=>{setGamePerPage(Number(e.target.value))}}>
                <option className={style.title} value="15">Games per page</option>
                <option className={style.title} value="15">15</option>
                <option className={style.title} value="12">12</option>
                <option className={style.title} value="10">10</option>
                <option className={style.title} value="8">8</option>
                <option className={style.title} value="6">6</option>
                <option className={style.title} value="4">4</option>
            </select>
        </div>
    )
}

export default SelectPerPage;