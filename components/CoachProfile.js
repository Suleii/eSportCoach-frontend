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




function CoachProfile (props) {
const [reviewCount, setReviewCount] = useState(0);
const [profile, setProfile] = useState([]);
const [reviews, setReviews] = useState([]);
const [experience, setExperience] = useState([]);
const [price, setPrice] = useState([]);

const user = useSelector((state) => state.user.value); 



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
    let prices = data.profile.price
    setPrice(prices)
    });
  }, [])


const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = {};
    if (i < profile.rating) {
      style = { 'color': '#599c5f' };
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
  }



const ExperienceList = experience.map((item)=>
<li>{item}</li>);



    return(
        <div className={styles.main}>
            <div>
            <div><img className={styles.image} src={profile.photo} alt="Profile pic" /></div>

                <div>    
                <span>@{props.username}</span>
                <div><span>{stars}</span><span>{reviewCount}</span></div>
                { user.isCoach 
                    ? <Link href="/">Edit Profile <span><FontAwesomeIcon icon={faPencil} style={{'color':"black"}}/></span> </Link>
                    : <Link href="/">Book Me <span><FontAwesomeIcon icon={faArrowRightLong} style={{'color':"black"}}/></span> </Link>
                }
                </div>
                <div><span><FontAwesomeIcon icon={faEllipsisVertical} style={{'color':"#ffffff"}} /></span></div>

                <h3> About me</h3>
                <p>{profile.about}</p>
                <div>
                 //socials   
                </div>
                <h3>Prices</h3>
                <div className="collapse collapse-arrow bg-secondary mt-6">
                    <input type="checkbox" /> 
                    <div className="collapse-title text-sm font-medium text-white p-6">
                        Solo Sessions
                    </div>
                    <div className="collapse-content text-white"> 
                        <p>1 session: €{price.oneSession}</p>
                        <div className="divider divider-accent"></div> 
                        <p>10 sessions: €{price.TenSession}</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-secondary mt-6 ">
                    <input type="checkbox" /> 
                    <div className="collapse-title text-sm font-medium text-white p-6">
                        Group Sessions
                    </div>
                    <div className="collapse-content text-white "> 
                        <p>1 session: €{price.oneGroupSession}</p>
                        <div className="divider divider-accent"></div> 
                        <p>10 sessions: €{price.tenGroupSessions}</p>
                    </div>
                </div>
                
                <h3>Experience/Achievements</h3>
                <ul>{ExperienceList}</ul> 
                <h3>Reviews</h3>
                {reviews.map((review)=>{
                    return <p>{review.content}</p>
                })}
            </div>
            
        </div>
    )
}

export default CoachProfile