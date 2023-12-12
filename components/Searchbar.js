"use client"
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;


function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const [redirect, setRedirect] = useState(false);

    // Manage navigation 
    const handleSearch = () => {
        if (searchInput.trim() !== '') { // delete whitespace with trim()
            setRedirect(true);
        }
    };

    useEffect(() => {
        if (redirect) {
            // Navigate to search page with requested search in searchInput
            window.location.href = `/search?search=${searchInput}`;
            setRedirect(false)
        }
    }, [redirect, searchInput]); // Re-rend component if redirect or searchInput are updated

    // Allow make the research with press on Enter keyboard button
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by coach name or by game"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearch} />
        </div>
    );
}

export default SearchBar;
