"use client"
import {format, parseISO} from 'date-fns'

// var getTime = require('date-fns/getTime');

function Event (props) {

let date = parseISO(props.date)
console.log(`DATE = ${date}`)
let time = date.toString().slice(15,21)

return (
    <div>
        <div className="text-xs mb-2">Session with {props.gamer}</div>
        <div className="badge badge-accent text-xs">{props.game}</div>
        <div className="text-xs">at {time}</div>
        <div className="divider divider-neutral h-0.5 mb-3"></div>
    </div>
)
}

export default Event;