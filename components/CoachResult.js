"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowRight} from '@fortawesome/free-solid-svg-icons';
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
        <div className="m-4 border-b border-white border-opacity-10">
           <div className="flex items-center space-x-4 m-5">
    <div className="avatar">
      <div className="w-14 h-14 rounded-full">
        <img src={props.photo} alt="profile picture" />
      </div>
    </div>
    <div className="flex-1">
      <div className="font-bold text-xl">@{props.username}</div>
      <div> 
        {stars} ({props.reviewsNumber})
      </div>

      <div className="flex mt-2">
        {props.gameTag.map((game, index) => (
          <div key={index} className="badge badge-accent text-xs mr-2">{game}</div>
        ))}
      </div>
    </div>
    <div>
      <div className="text-sm font-semibold mt-2 ml-2">From €{props.price}</div>
      <button
        className="btn btn-success text-white rounded-full flex items-center justify-center w-12 h-12 mt-2 ml-2"
        onClick={() => router.push(`/coaches/${props.username}`)}
      >
        <FontAwesomeIcon icon={faArrowRight} size="lg" />
      </button>
    </div>
  </div>
        </div>
    );
}

export default CoachResult;
