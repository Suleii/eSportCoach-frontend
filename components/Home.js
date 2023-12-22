"use client";
import SearchBar from "./Searchbar";
import { useState, useEffect } from "react";

// Prevent fontawesome icons from flashing large icons when reloading :
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bestCoaches, setBestCoaches] = useState([]);

  // Update searchQuery with query value on SearchBar
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Make a research by clicking on game images
  const navigateToSearch = (searchTerm) => {
    window.location.href = `http://localhost:3001/search?search=${encodeURIComponent(
      searchTerm
    )}`;
  };

  // Make a research by clicking on coach pictures

  const games = [
    { name: "League of Legends", image: "lol.jpg", searchTerm: "lol" },
    {
      name: "Counter Strike Global Offensive",
      image: "csgo.jpg",
      searchTerm: "counter-strike",
    },
    { name: "World of Warcraft", image: "wow.jpg", searchTerm: "wow" },
    { name: "Fortnite", image: "fortnite.jpg", searchTerm: "fortnite" },
    { name: "Apex Legends", image: "apex.jpg", searchTerm: "apex" },
    { name: "Overwatch", image: "overwatch.jpg", searchTerm: "overwatch" },
    {
      name: "Assetto Corsa Competizione",
      image: "acc.jpg",
      searchTerm: "assetto corsa",
    },
    { name: "Call Of Duty", image: "mw3.jpeg", searchTerm: "cod" },
    { name: "PUBG", image: "pubg.jpg", searchTerm: "pubg" },
    { name: "Pokemon", image: "pokemon.jpg", searchTerm: "pokemon" },
  ];

  useEffect(() => {
    fetch("http://localhost:3000/coaches/bestCoaches")
      .then((response) => response.json())
      .then(async (data) => {
        if (data.result) {
          console.log("data coaches", data.coaches);
          const coachesWithReviews = await Promise.all(
            // Use Promise.all to treat simultaneously all Promises return by maps
            data.coaches.map(async (coach) => {
              // Run through all coach data collected
              const reviewResponse = await fetch(
                `http://localhost:3000/reviews/${coach.user.username}`
              );
              const reviewData = await reviewResponse.json(); // For each code, send a request to collect his reviews
              return { ...coach, reviewCount: reviewData.reviews.length }; // Return a new object with all coaches data AND reviews length
            })
          );
          setBestCoaches(coachesWithReviews);
        }
      });
  }, []);

  // Fonction pour générer des étoiles
  const generateStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          style={{ color: i < rating ? "#599c5f" : undefined }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-5/6 flex-1">
        <SearchBar onSearch={handleSearch} />

        <h1 className="mt-10 ml-8">Top games</h1>
        <div className="rounded-box flex space-x-4 h-64 mt-10 overflow-x-auto pb-2 md:overflow-x-scroll w-full scrollbar-thumb-accent scrollbar-track-base-100 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          {games.map((game, index) => (
            <div key={index} className="carousel-item">
              <img
                className="w-40 rounded-lg cursor-pointer"
                src={game.image}
                alt={game.name}
                onClick={() => navigateToSearch(game.searchTerm)}
              />
            </div>
          ))}
        </div>

        <h1 className="mt-10 mb-5 ml-8">Best Coaches</h1>
        <div className="rounded-box flex space-x-4 h-56 mt-10 overflow-x-auto pb-2 md:overflow-x-scroll w-full scrollbar-thumb-accent scrollbar-track-base-100 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full">

          {bestCoaches.map((coach, index) => (
            <div
              key={index}
              className="carousel-item h-36 w-28 flex flex-col items-center "
            >
              
                <img
                  src={coach.photo}
                  alt={coach.user.username}
                  className=" w-24 h-24 rounded-full"
                />
              
              <p className="m-2">{coach.user.username}</p>
              <div className="flex flex-row">{generateStars(coach.rating)}</div>
              <p className="mt-2">({coach.reviewCount})</p>{" "}
              {/* Exemple de données */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
