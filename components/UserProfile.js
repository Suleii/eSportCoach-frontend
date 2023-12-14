"use client";
import styles from '../styles/CoachProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEllipsisVertical , faPencil, faArrowRightLong} from '@fortawesome/free-solid-svg-icons';

// Prevent fontawesome icons from flashing large icons when reloading :
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Review from './Reviews';



function UserProfile (props) {
// const [reviewCount, setReviewCount] = useState(0);
const [profile, setProfile] = useState([]);
const [reviewsdata, setReviewsData] = useState([]);
const [games, setGames] = useState([]);



const user = useSelector((state) => state.user.value); 



useEffect(() => {
    fetch(`http://localhost:3000/gamer/profile/${props.username}`)
    .then(response => response.json())
    .then(data => {
    setProfile(data.profile);
    let reviewsdata = data.profile.reviews;
    // setReviewCount(reviewsdata.length);
    setReviewsData(reviewsdata);
    let gamesData=data.profile.games;
    setGames(gamesData);
    });
  }, [])


  const reviews = reviewsdata.map((data, i) => {
    console.log(data)
    return <Review key={i} rating={data.rating} username={data.username.username} photo={data.photo} game={data.game} content={data.content}/>;
  });

const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = {};
    if (i < profile.rating) {
      style = { 'color': '#599c5f' };
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
  }


const gamesTags = games.map((item, i)=>
<div className="badge badge-accent text-xs mr-2" key={i}>{item}</div>
);


    return(
        <div className={styles.main}>
            <div className="flex flex-row justify-between w-5/6">
                <div className="avatar">
                    <div className="w-24 h-24 rounded-full">
                        <img src={profile.photo} alt="Profile pic" />
                    </div>
                </div>
                <div>
                    <div>
                    <span className="text-white mb-1">@{props.username}</span>
                    <span className="ml-5"><FontAwesomeIcon icon={faEllipsisVertical} style={{'color':"#ffffff"}} /></span></div>
                    {/* <div className="text-xs mb-6"><span>{stars}</span><span className="text-white"> ({reviewCount})</span></div>
                    { user.isCoach 
                        ? <Link href="/" type="button" className="btn btn-success text-white">Edit Profile <span className="text-white"><FontAwesomeIcon icon={faPencil} /></span> </Link>
                        : <Link href="/" type="button" className="btn btn-success text-white"></Link>
                    } */}
                    
                </div>
                
            </div>
          
                

               <h3 className="text-lg mt-6 mb-6">My reviews</h3>
                {reviews}
            
            
        </div>
    )
}

export default UserProfile