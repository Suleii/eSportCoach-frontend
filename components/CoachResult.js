"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCircleArrowRight} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import { useRouter } from 'next/navigation';

function CoachResult(props) {
  const router = useRouter();

    const stars = [];
    for (let i = 0; i < 5; i++) {
      let style = {};
      if (i < props.reviewsAvg) {
        style = { 'color': '599c5f' };
      }
      stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
    }

    return (
        <div>
            <h3>@{props.username}</h3>
            <div>{props.photo}</div>
            <div>{stars}</div>
            <div>({props.reviewsNumber})</div>
            <div>{props.gameTag}</div>
            <div>From €{props.price}</div>
            <FontAwesomeIcon icon={faCircleArrowRight} onClick={() => router.push(`/coaches/${props.username}`)} />
        </div>
    );
}

export default CoachResult;
