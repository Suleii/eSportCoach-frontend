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
            <div className="flex flex-row">
                <div><img className="p-5" src={profile.photo} alt="Profile pic" /></div>
                <div className="p-5">
                    <span className="text-white mb-1">@{props.username}</span>
                    <div className="text-xs mb-6"><span>{stars}</span><span className="text-white"> ({reviewCount})</span></div>
                    { user.isCoach 
                        ? <Link href="/" type="button" className="btn btn-success text-white">Edit Profile <span className="text-white"><FontAwesomeIcon icon={faPencil} /></span> </Link>
                        : <Link href="/" type="button" className="btn btn-success text-white">Book Me <span className="text-white"><FontAwesomeIcon icon={faArrowRightLong} /></span> </Link>
                    }
                </div>
                <div className="p-5"><span><FontAwesomeIcon icon={faEllipsisVertical} style={{'color':"#ffffff"}} /></span></div>
            </div>
            <div className="text-white">
                <h3 className="text-base mb-1"> About me</h3>
                <p className="text-sm">{profile.about}</p>
                <div>
                 //socials   
                </div>
                <h3>Prices</h3>
                <div className="collapse collapse-arrow bg-base-100 mt-6 w-52">
                    <input type="checkbox" /> 
                    <div className="collapse-title text-sm font-medium text-white p-6 ">
                        Solo Sessions
                    </div>
                    <div className="collapse-content text-white"> 
                        <p>1 session: €{price.oneSession}</p>
                        <div className="divider divider-neutral"></div> 
                        <p>10 sessions: €{price.TenSession}</p>
                    </div>
                </div>
<<<<<<< HEAD
                <div className="collapse collapse-arrow bg-secondary mt-6">
=======
                <div className="collapse collapse-arrow bg-base-100 mt-6 w-52">
>>>>>>> 9d1a3aa8ff941fa13562a42f1e32bba09c44e8c3
                    <input type="checkbox" /> 
                    <div className="collapse-title text-sm font-medium text-white p-6">
                        Group Sessions
                    </div>
                    <div className="collapse-content text-white "> 
                        <p>1 session: €{price.oneGroupSession}</p>
                        <div className="divider divider-neutral"></div> 
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