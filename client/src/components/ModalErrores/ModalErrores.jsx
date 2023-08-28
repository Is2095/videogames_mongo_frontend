
import style from './ModalErrores.module.css'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';

const ModalErrores = ({cierreModal}) => {   
  
     
    const {dataErrors} = useSelector ((state)=>state)
    useEffect(() => {   
        if (dataErrors.message)document.getElementById('modal1').style.display = 'block'
        else  document.getElementById('modal1').style.display = 'none' 
    }); 
  
   
    const cerrarModal = () => {  
        document.getElementById('modal1').style.display = "none" 
        cierreModal()
    }
    
    return (
        <div id="modal1"style={{display:'none'}} className={style.modal}  >
            <div  className={style.modalContainer} >
                <p className={style.texto}>{dataErrors.message}</p>
                <button type='reset'className={style.close} onClick={()=>cerrarModal()}>x</button>
            </div>
        </div>
    )
}
export default ModalErrores;