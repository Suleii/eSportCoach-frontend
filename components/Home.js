"use client";
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './Searchbar';
import SearchPage from './SearchPage';
import { useState } from 'react';

// Prevent fontawesome icons from flashing large icons when reloading :
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

function Home () {
    const [searchQuery, setSearchQuery] = useState('');

    // Update searchQuery with query value on SearchBar
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

return (
        <div>
            <a href="./login" className={styles.iconlogin}>
                <FontAwesomeIcon icon={faUser}/>
            </a>
                <h1>eSport Coach</h1>
                <h2>Get professional coaching for your favorite game</h2>
            <SearchBar onSearch={handleSearch} /> 
        </div>
    )
}

export default Home