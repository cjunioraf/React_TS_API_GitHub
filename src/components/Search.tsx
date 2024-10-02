import { BsSearch } from 'react-icons/bs';

import { useState, KeyboardEvent } from 'react';

import styles from "./Search.module.css";

type SearchProps = {
    loadUser: (userName: string) => Promise<void>;
}

const Search = ({loadUser}: SearchProps) => {

    const [userName, setUserName] = useState("");

    const handleKeyDown = (e : KeyboardEvent) => {

        if(e.key === "Enter"){
            loadUser(userName);
            setUserName("");
        }
    }

    const handleButtonClick = () => {
        loadUser(userName);
        setUserName(""); 
    }

  return (
    <div className={styles.search} >

        <h2>Busque um Usuário:</h2>
        <p>Conheça Melhores Repositórios</p>

        <div className={styles.searchContainer}>
            
            <input type="text" value={userName} placeholder='Digite o nome do usuário...' 
                onChange={(e) => setUserName(e.target.value)} 
                onKeyDown={handleKeyDown} />

            <button onClick={handleButtonClick}>
                <BsSearch />
            </button>

        </div>
        
    </div>
  )
}

export default Search