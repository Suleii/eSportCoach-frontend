"use client"
import {format, parseISO} from 'date-fns'

// var getTime = require('date-fns/getTime');

function Event (props) {

let date = parseISO(props.date)
console.log(`DATE = ${date}`)
let time = date.toString().slice(15,21)

return (
    <div>
    <div className='flex justify-between align-center'>
        <div className="text-base ">Session with {props.gamer}</div>
        <div className="text-base">{time}</div>
    </div>
    <div>
    <div className="badge badge-accent text-xs">{props.game}</div>
    //CANCEL
    </div>
    <div className="divider divider-neutral h-0.5 "></div>
    </div>
)
}

export default Event;