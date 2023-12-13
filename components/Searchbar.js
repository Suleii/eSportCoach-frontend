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
        <div className="flex flex-row justify-center mt-5">
            <div className="relative w-full max-w-xs"> 
                <FontAwesomeIcon 
                    icon={faMagnifyingGlass} 
                    onClick={handleSearch}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                />
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-full pl-10 rounded-xl" 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}

export default SearchBar;
