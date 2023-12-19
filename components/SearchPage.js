"use client";
import { useState, useEffect } from "react";
import CoachResult from "./CoachResult";
import SearchBar from "./Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faFilterCircleDollar,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function SearchPage({ searchQuery }) {
  const [results, setResults] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [isPriceModalVisible, setIsPriceModalVisible] = useState(false);
  const [languageFilter, setLanguageFilter] = useState(null);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

  // useEffect is triggered with the modification of searchQuery, minRating, minPrice, maxPrice and language
  useEffect(() => {
    // Collect quiz answers with local Storage
    const storedAnswers = localStorage.getItem("quizAnswers");
    let budgetFilterFromQuiz, languageFilterFromQuiz;

    if (storedAnswers) {
      const quizAnswers = JSON.parse(storedAnswers);
      budgetFilterFromQuiz = quizAnswers.maxBudget;
      languageFilterFromQuiz = quizAnswers.language;

      // Delete local Storage answers to avoid bug
      localStorage.removeItem("quizAnswers");
    }

    // GET API to collect search data
    if (searchQuery) {
      fetch(`http://localhost:3000/search/globalSearch?search=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            const searchResults = data.coachData
              ? [data.coachData]
              : data.gameData;
            searchResults.sort(() => 0.5 - Math.random());

            // Apply filter
            const filteredResults = searchResults.filter((item) => {
              return (
                item.rating >= minRating &&
                (minPrice === null || item.price >= minPrice) &&
                (maxPrice === null || item.price <= maxPrice) &&
                (languageFilter === null ||
                  item.language.includes(languageFilter)) &&
                (!budgetFilterFromQuiz || item.price <= budgetFilterFromQuiz) &&
                (!languageFilterFromQuiz ||
                  item.language.includes(languageFilterFromQuiz))
              );
            });

            setResults(filteredResults);
          } else {
            setResults([]);
          }
        });
    }
  }, [searchQuery, minRating, minPrice, maxPrice, languageFilter]);

  // Iterate on results to return every results  with CoachResult componant
  const resultData = results.map((result, index) => {
    const reviewsNumber = result.reviews ? result.reviews.length : 0;

    return (
      <CoachResult
        key={index}
        username={result.user.username}
        reviewsNumber={reviewsNumber}
        gameTag={result.games}
        languagesTag={result.language}
        price={result.price}
        reviewsAvg={result.rating}
        photo={result.photo}
      />
    );
  });

  // LANGUAGE MODAL

  // Open language modal
  const showLanguageModal = () => {
    setIsLanguageModalVisible(true);
  };

  // Update language and close modal
  const handleLanguageSelection = (language) => {
    setLanguageFilter(language);
    setIsLanguageModalVisible(false);
  };

  // Close language modal and reset filter
  const handleResetLanguageFilter = () => {
    setIsLanguageModalVisible(false);
    setLanguageFilter(null);
  };

  const LanguageModal = () => (
    <div className={`modal ${isLanguageModalVisible ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Select Language</h3>
        <div className="py-4 space-y-2">
          {["English", "French", "Spanish", "Italian"].map((language) => (
            <div
              key={language}
              onClick={() => handleLanguageSelection(language)}
              className="cursor-pointer"
            >
              <span className="badge badge-accent text-lg mr-2 bg-white text-black border-none m-2">
                {language}
              </span>
            </div>
          ))}
        </div>
        <div className="modal-action">
          <button
            className="btn btn-success text-white"
            onClick={handleResetLanguageFilter}
          >
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );

  // RATING MODAL

  // Open rating modal
  const showReviewsModal = () => {
    setIsRatingModalVisible(true);
  };

  // Update minRating and close modal
  const handleMinRatingSelection = (rating) => {
    setMinRating(rating);
    setIsRatingModalVisible(false);
  };

  // Close review modal and reset filter
  const handleResetRatingFilter = () => {
    setIsRatingModalVisible(false);
    setMinRating(0);
  };

  // Rating modal componant
  const RatingModal = () => (
    <div className={`modal ${isRatingModalVisible ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Select Minimum Rating</h3>
        <div className="py-4 space-y-2">
          {[5, 4, 3, 2, 1].reverse().map((rating) => (
            <div
              key={rating}
              onClick={() => handleMinRatingSelection(rating)}
              className="cursor-pointer flex items-center"
            >
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={`${
                      i < rating ? "text-green-700" : "text-gray-200"
                    } text-xl`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-white text-xl">{`${rating} star${
                rating > 1 ? "s" : ""
              }`}</span>
            </div>
          ))}
        </div>
        <div className="modal-action">
          <button
            className="btn btn-success text-white"
            onClick={handleResetRatingFilter}
          >
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );

  // PRICE MODAL

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
    const handleFilterByPrice = () => {
      setMinPrice(localMinPrice);
      setMaxPrice(localMaxPrice);
      setIsPriceModalVisible(false);
    };

    // Close review modal and reset filter
    const handleResetPriceFilter = () => {
      setIsPriceModalVisible(false);
      setMinPrice(null);
      setMaxPrice(null);
    };

    return (
      <div className={`modal ${isPriceModalVisible ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Select Price Range</h3>

          <div className="flex justify-between my-4">
            <span>Min: €{localMinPrice}</span>
            <span>Max: €{localMaxPrice}</span>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="range"
              min="0"
              max="1000"
              value={localMinPrice || 0}
              onChange={(e) => setLocalMinPrice(parseInt(e.target.value, 10))}
              className="range range-primary bg-white"
            />
            <input
              type="range"
              min="10"
              max="200"
              value={localMaxPrice || "200"}
              onChange={(e) => setLocalMaxPrice(parseInt(e.target.value, 10))}
              className="range range-primary bg-white"
            />
          </div>

          <div className="modal-action">
            <button
              className="btn btn-success text-white"
              onClick={handleFilterByPrice}
            >
              Filter
            </button>
            <button
              className="btn btn-success text-white"
              onClick={handleResetPriceFilter}
            >
              Reset Filter
            </button>
          </div>
        </div>
      </div>
    );
  };

  // FRONTEND USER INTERFACE

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-5/6 flex-1 text-white ">
        <div className="text-lg mb-10">Find the best coach for you...</div>
        <SearchBar />
        <>
          <div className="flex flex-col items-center justify-center text-lg mt-5">
            Filters
          </div>
          <div className="flex flex-row items-center w-full justify-center mt-5 justify-between">
            <div className="flex flex-col items-center space-y-2 mb-4">
              <div
                onClick={showReviewsModal}
                className={`rounded-2xl w-12 h-12 flex justify-center items-center  ${
                  minRating !== 0
                    ? "bg-orange-500 hover:bg-orange-400"
                    : "bg-zinc-400 hover:bg-zinc-300"
                } cursor-pointer`}
              >
                <FontAwesomeIcon icon={faStar} className="text-white" />
              </div>
              <div className="text-sm">Reviews</div>
              {isRatingModalVisible && <RatingModal />}
            </div>
            <div className="flex flex-col items-center justify-between space-y-2 mb-4">
              <div
                onClick={showPriceModal}
                className={`rounded-2xl w-12 h-12 flex justify-center items-center p-3 ${
                  minPrice !== null || maxPrice !== null
                    ? "bg-orange-500 hover:bg-orange-400"
                    : "bg-zinc-400 hover:bg-zinc-300"
                } cursor-pointer `}
              >
                <FontAwesomeIcon
                  icon={faFilterCircleDollar}
                  className="text-white"
                />
              </div>
              <div className="text-base">Price</div>
              {isPriceModalVisible && <PriceModal />}
            </div>

            <div className="flex flex-col items-center space-y-2 mb-4">
              <div
                onClick={showLanguageModal}
                className={`rounded-2xl w-12 h-12 flex justify-center items-center ${
                  languageFilter
                    ? "bg-orange-500 hover:bg-orange-400"
                    : "bg-zinc-400 hover:bg-zinc-300"
                } cursor-pointer`}
              >
                <FontAwesomeIcon icon={faLanguage} className="text-white" />
              </div>
              <div className="text-sm">Language</div>
              {isLanguageModalVisible && <LanguageModal />}
            </div>
          </div>
        </>
        {resultData.length > 0 ? (
          resultData
        ) : searchQuery ? (
          <div className="mt-5 text-xl">
            Sorry, no result matching your criteria
          </div>
        ) : (
          <div className="mt-5 text-xl">Use the search bar to find a coach</div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
