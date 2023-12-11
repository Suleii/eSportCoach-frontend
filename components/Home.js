"use client";
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';



function Home () {

    return(
        <div>
            <a href="./login" className={styles.iconlogin}>
                <FontAwesomeIcon icon={faUser}/>
            </a>
            <h1>eSport Coach</h1>
            <h2>Get professional coaching for your favorite game</h2>
        </div>
    )
}

export default Home