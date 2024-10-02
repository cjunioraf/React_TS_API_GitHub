import Search from '../components/Search';
import { useState } from 'react';
import { UserProps } from '../types/user';
import User from "../components/User";
import Erro from '../components/Erro';
import Loader from '../components/Loader';

const Home = () => {

    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState(false);
    const [searchedUser, setSearchedUser] = useState("");
    const [isLoading, setIsLoding] = useState(false); 
    // função
    const loadUser = async(userName: string) => {

        setSearchedUser(userName);
        setError(false); 
        setIsLoding(true);
        setUser(null);

        const resp = await fetch(`https://api.github.com/users/${userName}`);
        const data = await resp.json();        
        // console.log(data);
        setIsLoding(false);

        if(data.status === '404'){
            setError(true);            
            return;
        }

        const {avatar_url, login, location, followers, following } = data;

        const userData: UserProps = {
            avatar_url, 
            login, 
            location, 
            followers, 
            following
        };

        setUser(userData);         
    }

  return (
    <div>
        <Search loadUser={loadUser} />
        {isLoading && <Loader /> } 
        {user && <User {...user} /> }
        {error && <Erro userName={searchedUser} />}
    </div>
  )
}

export default Home