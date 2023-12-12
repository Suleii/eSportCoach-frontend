import { useState } from "react";

function SearchBar({ onSearch }) {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = () => {
        onSearch(searchInput);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by coach name or by game"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;
