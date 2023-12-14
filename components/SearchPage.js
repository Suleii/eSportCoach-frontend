"use client"
import Menu from './Menu'
import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import CoachResult from './CoachResult';
import SearchBar from "./Searchbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
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
    
    // Open review modal
    const showReviewsModal = () => {
        setIsModalVisible(true);
    };

    // Rating modal componant
    const RatingModal = () => (
        <Modal
        title="Select Minimum Rating"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setMinRating(0); // Reset filter on click on cancel button
        }}
        footer={[
          <button key="cancel" onClick={() => {
            setIsModalVisible(false);
            setMinRating(0); // Reset filter on click on cancel button
          }}>
            Cancel filter
          </button>,
          <button key="submit"  onClick={handleMinRatingSelection}>
            Filter
          </button>,
        ]}
      >
            {[1, 2, 3, 4, 5].map(rating => (
                <div key={rating} onClick={() => handleMinRatingSelection(rating)}>
                    {Array.from({ length: rating }, (_, i) => ( // Create a temporary array where length = rating 
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
            onCancel={() => {
              setIsPriceModalVisible(false);
              setMinPrice(null);
              setMaxPrice(null); // Reset filter after click on Cancel button
            }}
            onOk={handleOk}
            okText="Filter"
            okButtonProps={{ style: { backgroundColor: '#4B71A0' } }}
          >
                <div>
                    <input type="number" placeholder="Min Price" value={localMinPrice || ''} onChange={e => setLocalMinPrice(parseInt(e.target.value, 10) || null)} /> 
                    <input type="number" placeholder="Max Price" value={localMaxPrice || ''} onChange={e => setLocalMaxPrice(parseInt(e.target.value, 10) || null)} />
                </div>
            </Modal>
        );
    };
    
    

    return (
      <body className='h-screen flex flex-col'>
        <header className='mx-4 '>
          <div className='flex flex-row mt-6 mx-5'>
            <Menu />              
            <a href='/gamer' className='text-white  mb-10'>
              <FontAwesomeIcon icon={faUser} className='bg-success h-10 w-10 rounded-full py-3 '/>
            </a>
          </div>
          <h1 className='ml-8'>Hello eSport Coach</h1>
        </header>
        <div className="flex flex-col items-center justify-center text-white mx-4 mt-5 ">
          <div className="text-center text-2xl mb-10">Find the best coach for you...</div>
          <SearchBar />
          <div className="flex flex-col items-center justify-center text-xl my-4 p-3">
            Filters
          </div>
          <div className="flex flex-row items-center">
            <div className="flex flex-col items-center space-y-2 mb-4 mr-10">
              <div className={`rounded-2xl w-12 h-12 flex justify-center items-center  ${minRating !== 0 ? 'bg-orange-500' : 'bg-zinc-400'}`}>
                <FontAwesomeIcon icon={faStar} onClick={showReviewsModal} className="text-white" />
                <RatingModal />
              </div>
              <div className="text-sm">Reviews</div>
            </div>
            <div className="flex flex-col items-center justify-around space-y-2 mb-4">
              <div className={`rounded-2xl w-12 h-12 flex justify-center items-center p-3 ${minPrice || maxPrice !== null ? 'bg-orange-500' : 'bg-zinc-400'}`}>
                <FontAwesomeIcon icon={faFilterCircleDollar} onClick={showPriceModal} className="text-white" />
                <PriceModal />
              </div>
              <div className="text-sm">Price</div>
            </div>
          </div>
          {resultData}
        </div>
          <footer className="footer p-10 bg-base-100 text-white flex flex-row space-x-40 items-center absolute inset-x-0 bottom-0 h-16 ">
            <aside>
              <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current items-center">
                <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
              </svg>
                    
            </aside> 
              <div className='flex flex-row'>
                <a href='/'>Privacy</a>
                <a href='/'>Contact</a>
                <a href='/'>Terms</a>  
              </div>
            </footer>
        </body>
    );
}

export default SearchPage;
