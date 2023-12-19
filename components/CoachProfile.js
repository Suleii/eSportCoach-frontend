"use client";
import styles from "../styles/CoachProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faEllipsisVertical,
  faPencil,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

// Prevent fontawesome icons from flashing large icons when reloading :
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Review from "./Reviews";

function CoachProfile(props) {
  const [reviewCount, setReviewCount] = useState(0);
  const [profile, setProfile] = useState([]);
  const [reviewsdata, setReviewsData] = useState([]);
  const [experience, setExperience] = useState([]);
  const [price, setPrice] = useState();
  const [socials, setSocials] = useState({});
  const [games, setGames] = useState([]);
  const [coachToken, setcoachToken] = useState("");

  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3000/coaches/profile/${props.username}`)
      .then((response) => response.json())
      .then((data) => {
        setProfile(data.profile);

        let experiencedata = data.profile.experience;
        setExperience(experiencedata);

        let prices = data.profile.price;
        setPrice(prices);

        let socialslinks = data.profile.socials;
        setSocials(socialslinks);

        let gamesData = data.profile.games;
        setGames(gamesData);

        let profileToken = data.profile.user.token;
        setcoachToken(profileToken);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${props.username}`)
      .then((response) => response.json())
      .then((data) => {
        let reviewsdata = data.reviews;
        setReviewCount(reviewsdata.length);
        setReviewsData(reviewsdata);
      });
  }, []);

  const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = {};
    if (i < profile.rating) {
      style = { color: "#599c5f" };
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
  }

  const reviews = reviewsdata.map((data, i) => {
    return (
      <Review
        key={i}
        rating={data.rating}
        username={data.username.user.username}
        photo={data.username.photo}
        game={data.game}
        content={data.content}
      />
    );
  });

  const ExperienceList = experience.map((item, i) => (
    <li key={i} className="mb-4">
      {item}
    </li>
  ));

  const gamesTags = games.map((item, i) => (
    <div className="badge badge-accent text-xs mr-2" key={i}>
      {item}
    </div>
  ));

  console.log("profile", profile);
  return (
    <div className="flex flex-col items-center ">
      <div className="w-5/6 flex-1">
        <div className="flex flex-row justify-between">
          <div className="avatar">
            <div className="w-24 h-24 rounded-full">
              <img src={profile.photo} alt="Profile pic" />
            </div>
          </div>
          <div>
            <div>
              <span className="text-white mb-1">@{props.username}</span>
              <div className="dropdown dropdown-top dropdown-end ">
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
            <div className="text-xs mb-6">
              <span>{stars}</span>
              <span className="text-white"> ({reviewCount})</span>
            </div>
            {user.token === coachToken ? (
              <Link
                href={`/coaches/${props.username}/settings`}
                type="button"
                className="btn btn-success text-white"
              >
                Edit Profile{" "}
                <span className="text-white">
                  <FontAwesomeIcon icon={faPencil} />
                </span>{" "}
              </Link>
            ) : (
              <Link
                href={`/coaches/${props.username}/booking`}
                type="button"
                className="btn btn-success text-white"
              >
                Book Me{" "}
                <span className="text-white">
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </span>{" "}
              </Link>
            )}
          </div>
        </div>
        <div className="text-white w-full">
          <h3 className="text-lg mb-1"> About me</h3>
          <p className="text-sm mb-2">{profile.about}</p>
          {gamesTags}
          <div>
            <h3 className="text-lg mt-6">Experience/Achievements</h3>
            <div className="text-base mx-10 mt-4">
              <ul className="list-image-[url(../public/circle-check-solid.svg)]">
                {ExperienceList}
              </ul>
            </div>
          </div>
          <div className="flex flex-row">
            <ul className="menu menu-horizontal bg-base-100 rounded-box mb-6">
              {socials.twitch ? (
                <li>
                  <a href={socials.twitch}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="currentColor"
                      style={{ color: "#9146ff" }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              ) : (
                ""
              )}
              {socials.discord ? (
                <li>
                  <a href={socials.discord}>
                    <svg
                      className="h-7 w-7"
                      fill="currentColor"
                      style={{ color: "#7289da" }}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    >
                      <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
                    </svg>
                  </a>
                </li>
              ) : (
                ""
              )}
              {socials.youtube ? (
                <li>
                  <a href={socials.youtube}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="currentColor"
                      style={{ color: "#ff0000" }}
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </a>
                </li>
              ) : (
                ""
              )}
              {socials.instagram ? (
                <li>
                  <a href={socials.instagram}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="currentColor"
                      style={{ color: "#c13584" }}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          <h3 className="text-lg mb-1">Price</h3>
          <div className="">1 session (2hrs): €{price}</div>

          <h3 className="text-lg mt-6 mb-6">Reviews</h3>
          {reviews.length > 0 ? (
            reviews
          ) : (
            <p> No reviews yet for this coach! </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoachProfile;
