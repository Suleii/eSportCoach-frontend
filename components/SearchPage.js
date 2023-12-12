import { useEffect, useState } from "react";
import CoachResult from './CoachResult'; // Assurez-vous que le chemin est correct
import SearchBar from "./SearchBar";

function SearchPage({ search }) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (search) {
            fetch(`http://localhost:3000/search/globalSearch?search=${search}`)
                .then(response => response.json())
                .then(data => {
                    if (data.result) {
                        setResults(data.coachData); 
                    }
                });
        }
    }, [search]);

    const resultData = results.map((result, index) => (
        <CoachResult key={index} coach={result} />
    ))

    return (
        <div>
            <div>Find the best coach for you...</div>
            <SearchBar />
            <div>Filters</div>
            {resultData}
        </div>
    );
}

export default SearchPage;
