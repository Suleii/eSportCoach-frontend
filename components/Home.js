"use client";
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import SearchPage from './SearchPage';
import { useState } from 'react';


function Home () {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);

    const handleSearch = (searchInput) => {
        setSearchTerm(searchInput);
        setShowSearchResults(true);
    };

return(
        <div>
            <a href="./login" className={styles.iconlogin}>
                <FontAwesomeIcon icon={faUser}/>
            </a>
                {!showSearchResults ? (
            <>
                <h1>eSport Coach</h1>
                <h2>Get professional coaching for your favorite game</h2>
                <SearchBar onSearch={handleSearch} />
            </>) : (
                    <SearchPage search={searchTerm} />
                )}
        </div>
    )
}

export default Home