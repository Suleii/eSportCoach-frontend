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
const [bookings, setBookings] = useState([]);



const user = useSelector((state) => state.user.value); 



useEffect(() => {
    fetch(`http://localhost:3000/gamers/profile/${props.username}`)
    .then(response => response.json())
    .then(data => {
    setProfile(data.profile); // to get the profile pic
    });

    fetch(`http://localhost:3000/bookings/gamer/${props.username}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if(data.result){
        setBookings(data.bookings)
      }else{
        setBookings([])
      }
    });

    fetch(`http://localhost:3000/reviews/gamer/${props.username}`)
    .then(response => response.json())
    .then(data => {
        let reviewsdb = data.reviews
        setReviewsData(reviewsdb)
    })
  }, [])

  
  console.log("reviewsdata", reviewsdata)

  // const reviews = 
  //   if(reviewsdata.length===0){
  //     bookings.map((booking, j)=> {
  //     return <Review key={j} rating={0} username={booking.coachUsername.user.username} photo={data.username.photo} game={booking.game} content="No reviews for this coach yet"/>;
  //     })
  //   }else{
  //     reviewsdata.map((data) => {})
  //   }
  // });

 
  const haveSameCoach = (bookings, reviewsdata) => {
    for (let i = 0; i < bookings.length; i++) {
      for (let j = 0; j < reviewsdata.length; j++) {
        if (bookings[i].coachUsername.user.username === reviewsdata[j].coach.user.username) {
          console.log("Found a match")
          return true; // Found a common element with the same coach username
        }
      }
    }
    console.log("No match")
    return false; // No common element found
  }


// const gamesTags = games.map((item, i)=>
// <div className="badge badge-accent text-xs mr-2" key={i}>{item}</div>
// ); 

// console.log("reviews data", reviewsdata)

    return(
        <div className="flex flex-col items-center min-h-screen">
          <div className='w-5/6 flex-1'>
            <div className="flex flex-row justify-between">
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
               {bookings.map((booking, i) => {
                const hasMatchingCoach = haveSameCoach([booking], reviewsdata);
                
                return hasMatchingCoach ? (
                  reviewsdata.map((data, j) => (
                    <Review key={j} rating={data.rating} username={data.coach.user.username} photo={data.coach.photo} game={data.game} content={data.content} />
                  ))
                ) : (
                  <Review key={i} rating={0} username={booking.coachUsername.user.username} photo={booking.coachUsername.photo} game={booking.game} content="No reviews for this coach yet. Do it now!" />
                );
              })}
                
            
            </div>
        </div>
    )
}

export default UserProfile