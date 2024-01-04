"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Quiz = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [maxBudget, setMaxBudget] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch available games
  useEffect(() => {
    fetch(`https://experience-backend.vercel.app
/coaches/games`)
      .then((response) => response.json())
      .then((data) => {
        setGames(data.availableGames);
      });
  }, []);

  // Fetch available languages
  useEffect(() => {
    fetch(`https://experience-backend.vercel.app
/coaches/languages`)
      .then((response) => response.json())
      .then((data) => {
        setLanguages(data.availableLanguages);
      });
  }, []);

  const handleGameSelection = (event) => {
    setSelectedGame(event.target.value);
  };

  const handleLanguageSelection = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleMaxBudgetSelection = (event) => {
    setMaxBudget(event.target.value);
  };

  const handleSubmit = () => {
    if (!selectedGame) {
      setErrorMessage("Please select a game before proceed");
      return;
    }

    const quizAnswers = {
      maxBudget: maxBudget,
      language: selectedLanguage,
    };

    // Save answers into localStorage in order to collect theses info in searchPage
    localStorage.setItem("quizAnswers", JSON.stringify(quizAnswers));

    window.location.href = `/search?search=${selectedGame}`;
  };

  console.log({ games, maxBudget, selectedLanguage });

  return (
    <div className="flex flex-col items-center">
      <div className="w-5/6 flex-1">
        <p className="mb-10 text-lg">
          Let us help find the best coach for you!
        </p>

        {/* Game Selection */}
        <div className="mb-5">
          <label htmlFor="gameSelection" className="label">
            What game do you need a coach for?*
          </label>
          <select
            id="gameSelection"
            className="select select-bordered w-full rounded-md"
            onChange={handleGameSelection}
            value={selectedGame || ""}
          >
            <option disabled value="">
              Select a game
            </option>
            {games.map((game, index) => (
              <option key={index} value={game}>
                {game}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Question */}
        <div className="form-control mb-5">
          <label htmlFor="budget" className="label">
            What is your maximum budget for a 2-hour session?
          </label>
          <input
            type="number"
            id="budget"
            className="input input-bordered w-full"
            value={maxBudget}
            onChange={handleMaxBudgetSelection}
            placeholder="100"
          />
        </div>

        {/* Language Selection */}
        <div className="mb-5">
          <label htmlFor="languageSelection" className="label">
            What language should your coach speak?
          </label>
          <select
            id="languageSelection"
            className="select select-bordered w-full rounded-md"
            onChange={handleLanguageSelection}
            value={selectedLanguage || ""}
          >
            <option disabled value="">
              Select a language
            </option>
            {languages.length > 0 ? (
              languages.map((language, index) => (
                <option key={index} value={language}>
                  {language}
                </option>
              ))
            ) : (
              <option disabled>No language available</option>
            )}
          </select>
        </div>

        {/* Submit Button */}
        {errorMessage && (
          <div className="text-red-500 mb-3">{errorMessage}</div>
        )}

        <button
          type="button"
          className="w-80 mx-auto btn btn-success text-white mb-3"
          onClick={handleSubmit}
        >
          Find my coach
        </button>

        <Link href="/" className="flex justify-end w-full">
          Skip {">"}
          {">"}
        </Link>
      </div>
    </div>
  );
};

export default Quiz;
