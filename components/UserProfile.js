"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";

// Prevent fontawesome icons from flashing large icons when reloading :
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { useState, useEffect } from "react";
import Review from "./Reviews";
import GamerSchedule from "./GamerSchedule";

function UserProfile(props) {
  // const [reviewCount, setReviewCount] = useState(0);
  const [profile, setProfile] = useState([]);
  const [reviewsdata, setReviewsData] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/gamers/profile/${props.username}`)
      .then((response) => response.json())
      .then((data) => {
        setProfile(data.profile); // to get the profile pic
      });

    fetch(`http://localhost:3000/bookings/gamer/${props.username}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          setBookings(data.bookings);
        } else {
          setBookings([]);
        }
      });

    fetch(`http://localhost:3000/reviews/gamer/${props.username}`)
      .then((response) => response.json())
      .then((data) => {
        let reviewsdb = data.reviews;
        setReviewsData(reviewsdb);
      });
  }, []);

  console.log("reviewsdata", reviewsdata);

  // Check if there is a coach who was booked but does not have a review
  const haveSameCoach = (bookings, reviewsdata) => {
    for (let i = 0; i < bookings.length; i++) {
      for (let j = 0; j < reviewsdata.length; j++) {
        if (
          bookings[i].coachUsername.user.username ===
          reviewsdata[j].coach.user.username
        ) {
          console.log("Found a match");
          return true; // Found a common element with the same coach username
        }
      }
    }
    console.log("No match");
    return false; // No common element found
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-5/6 flex-1">
        <div className="flex flex-row justify-between mb-6 items-center">
          <div className="flex items-center ">
            <div className="avatar">
              <div className="w-16 h-16 rounded-full">
                <img src={profile.photo} alt="Profile pic" />
              </div>
            </div>
            <span className="text-white ml-2">@{props.username}</span>
          </div>
          <div>
            <div className="dropdown dropdown-end ">
              <div tabIndex={0}>
                <span className="ml-5  ">
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    style={{ color: "#ffffff" }}
                  />
                </span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu  bg-base-100 rounded-box w-36 h-7 justify-center align-center"
              >
                <li className="text-accent text-xs">
                  <a href="/contact">Report this user</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <GamerSchedule
          username={props.username}
          profile={profile}
          bookings={bookings}
        />

        <h3 className="text-lg mt-10 mb-6">My reviews</h3>
        {bookings.map((booking, i) => {
          const hasMatchingCoach = haveSameCoach([booking], reviewsdata);

          return (
            <div key={i}>
              {hasMatchingCoach ? (
                reviewsdata
                  .filter(
                    (data) =>
                      booking.coachUsername.user.username ===
                      data.coach.user.username
                  )
                  .map((filteredData, j) => (
                    <Review
                      key={j}
                      rating={filteredData.rating}
                      coach={filteredData.coach.user.username}
                      photo={filteredData.coach.photo}
                      game={filteredData.game}
                      content={filteredData.content}
                    />
                  ))
              ) : (
                <Review
                  key={i}
                  rating={0}
                  coach={booking.coachUsername.user.username}
                  photo={booking.coachUsername.photo}
                  game={booking.game}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserProfile;
