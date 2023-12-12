"use client"
import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import CoachResult from './CoachResult';
import SearchBar from "./Searchbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFilterCircleDollar} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;


function SearchPage({ searchQuery }) {
    const [results, setResults] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [isPriceModalVisible, setIsPriceModalVisible] = useState(false);

    // Function to get the lowestPrice according the different options of coaches
    const getLowestPrice = (prices) => {
        return Math.min(...Object.values(prices).filter(Boolean));
    };

    // useEffect is triggered with the modification of searchQuery, minRating, minPrice or maxPrice
    useEffect(() => {
        // searchQuery is a prop which is used on app/search/page.js
        if (searchQuery) {
            fetch(`http://localhost:3000/search/globalSearch?search=${searchQuery}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.result) {
                        // coachData if search by username of gameData if search by game name
                        const searchResults = data.coachData ? [data.coachData] : data.gameData; 
                        
                        // Sort randomly the arrays displayed
                        searchResults.sort(() => 0.5 - Math.random()); 
            
                        // Optionnaly filter the results according to rating score
                        const resultsWithRating = searchResults.filter(item => item.rating >= minRating);

                        // Optionnaly filter the results according to price
                        const resultsWithPrice = resultsWithRating.filter(item => {
                             const lowestPrice = getLowestPrice(item.price);
                             return (minPrice === null || lowestPrice >= minPrice) && (maxPrice === null || lowestPrice <= maxPrice);
                        });
                        setResults(resultsWithPrice);
                    } else {
                        setResults([]);
                    }
                })
        }
    }, [searchQuery, minRating, minPrice, maxPrice]);


    // Iterate on results to return every results  with CoachResult componant
    const resultData = results.map((result, index) => {
        // Get the lowest price
        const { oneSession, tenSessions, oneGroupSession, tenGroupSessions } = result.price;
        const prices = [oneSession, tenSessions, oneGroupSession, tenGroupSessions].filter(Boolean)
        const lowestPrice = Math.min(...prices); // spread operator to get one array with all argument

        const reviewsNumber = result.reviews ? result.reviews.length : 0;

        return (
            <CoachResult 
            key={index} 
            username={result.user.username} 
            reviewsNumber={reviewsNumber}
            gameTag={result.games}
            price={lowestPrice}
            reviewsAvg={result.rating}
            photo={result.photo}
            />
        );
    });

    // Update minRating and close modal
    const handleMinRatingSelection = (rating) => {
        setMinRating(rating);
        setIsModalVisible(false);
    };
    
    // Open modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Rating modal componant
    const RatingModal = () => (
        <Modal
            title="Select Minimum Rating"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
        >
            {[1, 2, 3, 4, 5].map(rating => (
                <div key={rating} onClick={() => handleMinRatingSelection(rating)}>
                    {Array.from({ length: rating }, (_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} style={{ color: '599c5f' }} />
                    ))}
                </div>
            ))}
        </Modal>
    );

    // Open Price modal
    const showPriceModal = () => {
        setIsPriceModalVisible(true);
    };
    
    // Price modal component
    const PriceModal = () => {
        // Local state of modal to avoid reload everytime we put a number
        const [localMinPrice, setLocalMinPrice] = useState(minPrice);
        const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
    
        // update MinPrice, MaxPrice and close modal
        const handleOk = () => {
            setMinPrice(localMinPrice);
            setMaxPrice(localMaxPrice);
            setIsPriceModalVisible(false);
        };
    
        return (
            <Modal
                title="Select Price Range"
                open={isPriceModalVisible}
                onCancel={() => setIsPriceModalVisible(false)}
                onOk={handleOk}
            >
                <div>
                    <input type="number" placeholder="Min Price" value={localMinPrice || ''} onChange={e => setLocalMinPrice(parseInt(e.target.value, 10) || null)} /> 
                    <input type="number" placeholder="Max Price" value={localMaxPrice || ''} onChange={e => setLocalMaxPrice(parseInt(e.target.value, 10) || null)} />
                </div>
            </Modal>
        );
    };
    
    

    return (
        <div>
            <div>Find the best coach for you...</div>
            <SearchBar />
            <div>Filters</div>
            <FontAwesomeIcon icon={faStar} onClick={showModal} />
            <RatingModal />
            <FontAwesomeIcon icon={faFilterCircleDollar} onClick={showPriceModal} />
            <PriceModal />
            {resultData}
        </div>
    );
}

export default SearchPage;
