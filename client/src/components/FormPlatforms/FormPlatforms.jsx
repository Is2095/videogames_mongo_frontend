
import { useSelector } from "react-redux"
import { useState } from "react"
import style from './FormPlatforms.module.css'
import { useDispatch } from "react-redux"

import { DATA_ERRORS } from '../../Redux/Actions/actionType';
import { ModalErrores } from "../index";

export const validate = (platform) => {
    let error = {} 
    
    if(platform.length === 0) error.platforms = 'You must enter at least one platform'
    if((platform.length) > 10 ) error.platforms = 'Only 10 platforms are allowed per Videogame'
    return error
}
const FormPlatforms = ({setForm, form, statusPlatform, setStatusPlatform, setError}) => {
    
    const platforms = useSelector(state=>state.platforms)
    const dispatch = useDispatch()
    
    const [platform, setPlatform] = useState([]);
    const [errorPlatform, setErrorPlatform] = useState({platforms:''});
    
    const platfomHandle = (e) => {
        const {value} = e.target
        if(platform.includes(value)) {
            setPlatform(platform.filter(ele => ele !== value))
            setErrorPlatform(validate(platform.filter(ele => ele !== value))) 
        } else {
            setPlatform([...platform, value])
            setErrorPlatform(validate([...platform, value]))
        } 
    }
       
    const cleanSelectionPlatforms = (e) => {
        e.preventDefault()
        setPlatform([])
        const selectionDelete= document.querySelectorAll('#plataformas')
        selectionDelete.forEach(a=> a.checked = false)
    }

    const saveSelectionHandler = (e) => {

        e.preventDefault()
        setError(validate(platform))
        setErrorPlatform(validate(platform))
      
        setForm({...form, platforms: platform})
          
        setPlatform([])

        if(Object.keys(validate(platform)).length === 0) setStatusPlatform(!statusPlatform)          
    }
    const cerrarPlatforms = () => {
        setError(validate(platform))
        setErrorPlatform(validate(platform))
        setStatusPlatform(!statusPlatform)
    }

    const cierreModal = () => {
        dispatch({type:DATA_ERRORS, payload: {}})
    }
    
    return (
        <div>
            <ModalErrores cierreModal={cierreModal}/>
            {statusPlatform       
            ? <div className={style.container}>
                <div className={style.platfoms}>
                    {platforms &&  statusPlatform && platforms.map(e=> {
                            return (
                                <div className={style.cheboxx}>
                                    <input type="checkbox" id="plataformas" name={e} value={e} onChange={platfomHandle}/>
                                    <label>{e}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={style.botones}>
                    <button id="save" onClick={saveSelectionHandler} className={style.botonesP}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-box-arrow-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"/>
  <path fill-rule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
</svg></button>
                    <button onClick={cleanSelectionPlatforms} className={style.botonesP}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg></button>
                    <button onClick={cerrarPlatforms} className={style.botonesPX}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg></button>
                    {errorPlatform.platforms && <p className={style.error}>{errorPlatform.platforms}</p>}
                </div>
                </div>
                
            :null
            }
        
    </div>
      
    )
}
export default FormPlatforms;