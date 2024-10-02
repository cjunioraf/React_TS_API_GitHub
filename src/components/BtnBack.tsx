import { useNavigate } from "react-router-dom"

import styles from "./BtnBack.module.css";

const BtnBack = () => {

    const navegate = useNavigate();

    return (
        <>  
            <button className={styles.btnBack} onClick={() => navegate(-1)}>Voltar</button>  
        </>
    )
}

export default BtnBack