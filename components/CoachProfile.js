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
import Dropdown from 'react-bootstrap/Dropdown';



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
                    <Dropdown className={styles.dropdownPrice}>
							<Dropdown.Toggle className={styles.dropdownButton}>
								Solo Coaching
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item onClick={(e)=>setSignUpCoach(false)}>1 session: {price.oneSession}</Dropdown.Item>
                                <Dropdown.Divider />
								<Dropdown.Item onClick={(e)=>setSignUpCoach(true)}>10 sessions: {price.TenSession} </Dropdown.Item>
							</Dropdown.Menu>
					</Dropdown>

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