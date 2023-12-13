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
                
            

                <div className="carousel rounded-box">
                    <div className="carousel-item">
                        <img src="../public/lol.jpeg" alt="League of Legends" />
                    </div> 
                     <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" alt="Burger" />
                    </div> 
                    <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" alt="Burger" />
                     </div> 
                     <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" alt="Burger" />
                    </div> 
                     <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" alt="Burger" />
                    </div> 
                     <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" alt="Burger" />
                    </div> 
                     <div className="carousel-item">
                        <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" alt="Burger" />
                    </div>
                </div>
                </div>
        
    )
}

export default Home