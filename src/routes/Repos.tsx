import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BtnBack from "../components/BtnBack";
import { RepoProps } from "../types/repo";
import Loader from "../components/Loader";
import Repo from "../components/Repo";
import styles from "./Repos.module.css";

const Repos = () => {    
    const { username } = useParams<{ username: string }>();
    const [repos, setRepos] = useState<RepoProps[] | [] | null>(null);
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {       
        const loadRepos = async (username: string) => {
            setIsLoading(true);
            try {
                const resp = await fetch(`https://api.github.com/users/${username}/repos`);
                const data = await resp.json();
                // console.log(data);
                setIsLoading(false);

                let orderedRepos = data.sort(
                    (a: RepoProps, b: RepoProps) => b.stargazers_count - a.stargazers_count
                ); 

                orderedRepos = orderedRepos.slice(0, 20);

                setRepos(orderedRepos);
            } catch (error) {
                console.error("Error fetching repos:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        if (username) {
            loadRepos(username);
        }

    }, [username]);

    if(!repos && isLoading) return <Loader />
  
    return (

        <div className={styles.repos}>                       

            <BtnBack />

            <h2>Explore os repositórios do usuário: {username} </h2>

            { repos && repos.length === 0 && <p>Não há repositórios.</p> }
            
            { repos && repos.length > 0 && (

                <div className={styles.reposContainer}>

                    {repos.map((repo: RepoProps) => (
                        <Repo key={repo.name} {...repo}/>
                    ))}

                </div>
            )}            

        </div>
    );
}

export default Repos;
