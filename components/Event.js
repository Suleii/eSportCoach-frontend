"use client"
import {format, parseISO} from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// Prevent fontawesome icons from flashing large icons when reloading :
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

// var getTime = require('date-fns/getTime');

function Event (props) {

let date = parseISO(props.date)
console.log(`DATE = ${date}`)
let time = date.toString().slice(15,21)

const [isDeleted, setisDeleted] = useState(false);


const handleCancel = () => {
    fetch('http://localhost:3000/bookings', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            _id: props.id
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        setisDeleted(data.result)
        })
    }


return (
    <div>
        {isDeleted
        ? ""
        :
    <div>
    <div className='flex justify-between align-center mb-1'>
        <div className="text-base ">Session with {props.gamer}</div>
        <div className="text-base">{time}</div>
    </div>
    <div className='flex justify-between items-center'>
    <div className="badge badge-accent text-xs">{props.game}</div>
    <div className="dropdown dropdown-left">
        <div tabIndex={0} role="button"><span className='text-3xl'><FontAwesomeIcon icon={faCircleXmark} ></FontAwesomeIcon></span></div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu  bg-white rounded-box w-44 h-9 justify-center mr-2 align-center">
                <li onClick={handleCancel} className='text-accent text-sm'><a>Cancel this session</a></li>
            </ul>
        </div>
    </div>
    <div className="divider divider-neutral h-0.5 mt-2"></div>
    </div>
        }
    </div>
)
}

export default Event;