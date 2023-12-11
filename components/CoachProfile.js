"use client";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/CoachProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEllipsisVertical , faArrowRight} from '@fortawesome/free-solid-svg-icons';



function CoachProfile (props) {
    const [reviewCount, setReviewCount] = useState(0);

const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = {};
    if (i < props.rating - 1) {
      style = { 'color': '#f9a602' };
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
  }


fetch(`http://localhost:3000/reviews/:${props.username}`)
  .then(response => response.json())
			.then(data => {
				setReviewCount(data.length)
			});

    return(
        <div>
            <div><img className={styles.image} src={props.photo} alt="Profile pic" /></div>
            <div>
                <h1>{props.username}</h1>
                <div><span>{stars}</span><span>{reviewCount}</span></div>
                <Button>Book Me <span><FontAwesomeIcon key={i} icon={faArrowRight} style={{'color':"#ffffff"}}/></span> </Button>
            </div>
            <span><FontAwesomeIcon key={i} icon={faEllipsisVertical} style={style} /></span>
        </div>
    )
}

export default CoachProfile