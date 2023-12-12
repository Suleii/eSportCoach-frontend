"use client";
import styles from '../styles/CoachProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEllipsisVertical , faArrowRight} from '@fortawesome/free-solid-svg-icons';

// Prevent fontawesome icons from flashing large icons when reloading :
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import { useState, useEffect } from 'react';
import Link from 'next/link';

function CoachProfile (props) {
const [reviewCount, setReviewCount] = useState(0);
const [profile, setProfile] = useState([])
const [reviews, setReviews] = useState([])
const [experience, setExperience] = useState([])


useEffect(() => {
    fetch(`http://localhost:3000/coaches/profile/${props.username}`)
    .then(response => response.json())
    .then(data => {
    setProfile(data.profile);
    let reviewsdata = data.profile.reviews;
    setReviewCount(reviewsdata.length);
    setReviews(reviewsdata);
    let experiencedata = data.profile.experience;
    setExperience(experiencedata);
    });
  }, [])


const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = {};
    if (i < profile.rating) {
      style = { 'color': 'green' };
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
  }



const ExperienceList = experience.map((item)=>
<li>{item}</li>);



    return(
        <div>
            {/* <div><img className={styles.image} src={props.photo} alt="Profile pic" /></div> */}
            <div>
                <span>@{props.username}</span>
                <div><span>{stars}</span><span>{reviewCount}</span></div>
                <Link href="/">Book Me <span><FontAwesomeIcon icon={faArrowRight} style={{'color':"#ffffff"}}/></span> </Link>
                <h3> About me</h3>
                <p>{profile.about}</p>
                <div>
                    
                </div>
                <h3>Prices</h3>
                <h3>Experience/Achivements</h3>
                <ul>{ExperienceList}</ul> 
                <h3>Reviews</h3>
                {reviews.map((review)=>{
                    return <p>{review.content}</p>
                })}
            </div>
            <span><FontAwesomeIcon icon={faEllipsisVertical} style={{'color':"#ffffff"}} /></span>
        </div>
    )
}

export default CoachProfile