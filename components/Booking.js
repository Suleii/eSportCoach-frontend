"use client"
import DateTimePicker from "../components/DateTimePicker";
import React, {useState} from 'react';

function Booking() {
    const [sessionCount, setSessionCount] = useState();
    const [message, setMessage] = useState('')

    const handleSessionCount = (event) => {
        setSessionCount(parseInt(event.target.value));
        console.log(sessionCount)
    };
    
    const handleBooking = () => {
        if (!date) {
           setMessage('Please select a date and time.')
        }
    }
   

return (
    <div>
        <div>
            <select className="select select-primary w-full max-w-xs" value="pick" onChange={handleSessionCount}>
                <option value="pick" disabled>Please choose the number of sessions:</option>
                <option value={1}>1 session</option>
                <option value={10}>10 sessions</option>
            </select>
    <DateTimePicker/>
        </div>
        <p>{message}</p>
        <button type='button' onClick={handleBooking}>Book my coach</button> 
        
    </div>
    


)
}
export default Booking