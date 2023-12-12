"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';


function Review(props) {
        
    const stars = [];
    for (let i = 0; i < 5; i++) {
      let style = {};
      if (i < props.rating) {
        style = { 'color': '#599c5f' };
      }
      stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
    }
    


	return (
        
            <div role="alert" className=" flex flex-row justify-between w-full">
                <div className='flex flex-col w-full'>
                    
                    <div  className="flex flex-row items-center justify-between mb-2">
                        <div className="avatar items-center ">
                            <div className="w-10 h-10 rounded-full mr-4">
                                <img src={props.photo} alt="Profile pic" />
                            </div>
                            <span className="text-sm">@{props.username}</span>
                        </div>
                        
                            <span className="text-xs">{stars}</span>
                        
                        
                    </div>
                        <div className="text-xs mb-2">{props.content}</div>
                        <div className="badge badge-accent text-xs">{props.game}</div>
                        <div className="divider divider-neutral h-0.5 mb-3"></div>
                </div>
                
            
           
            </div>

        
        
	);
}

export default Review;