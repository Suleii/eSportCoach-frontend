"use client"
import React from 'react';
import Calendar from 'react-calendar';
import { useState , useEffect} from 'react';
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/DateTimepicker.module.css';
import {add, format} from 'date-fns'

function Booking() {



    const [sessionCount, setSessionCount] = useState(0);
    const [message, setMessage] = useState('')

    const handleSessionCount = (event) => {
        setSessionCount(parseInt(event.target.value));
        // console.log(sessionCount)
    };
    
useEffect(() =>{
    console.log(sessionCount)
},[sessionCount])

    const handleBooking = () => {
        if (!date) {
           setMessage('Please select a date and time.')
        }
    }

    const [date, setDate] = useState({selectedDate: null, dateTime: null})
    const [times, setTimes] = useState([])


    const getTimes = () => {
       
        if (!date.selectedDate) {
            console.log(`return`)
            return}
        const {selectedDate} = date
        const beginning = add(selectedDate, {hours: 1})
        const end = add(selectedDate, { hours :24})
        const interval = 60 // in minutes

        const times = []
        for (let i = beginning; i<= end; i=add(i, {minutes: interval})) {
            times.push(i)
        }
        setTimes(times)
    }
   
    const handleDayClick = (date) => {
        setDate((prev) => ({ ...prev, selectedDate: date , dateTime: null}));
        // setDate((prev) => ({...prev, dateTime: null}))
        };
        
    // useEffect sera déclenché chaque fois que la date change
    useEffect(() => {
        if (date.selectedDate) {
        getTimes();
        }
        }, [date.selectedDate]);   

        console.log(date)
return (
    <div>
        <div>
            <select
                className="select select-bordered w-64 h-10 rounded-md"
                onChange={handleSessionCount}>
                <option disabled selected>Please choose the number of sessions:</option>
                <option value="1">1 session</option>
                <option value="10">10 sessions</option>
            </select>
            <div >
         <div className='flex flex-col justify-center items-center'>
                    <div>
                        <Calendar 
                            minDate={new Date()} 
                            className={styles.reactcalendar}  
                            view='month' 
                            onClickDay={(date) => handleDayClick(date) } 
                            locale='en-GB'/>
                    </div>

                    <div className='flex flex-row flex-wrap gap-4 mt-10 justify-center'>
                        {times.map((time,i) =>{
                            return (
                            <div key={`time-${i}`} className=' rounded-sm bg-accent p-2'>
                                <button type='button' onClick={()=>{setDate((prev) => ({...prev, dateTime: time})) }}>{format(time, "kk:mm")}</button>
                            </div>
                            )
                        })}
                    </div>
        </div>
    </div>
        </div>
        <p>{message}</p>
        <button type='button' onClick={handleBooking}>Book my coach</button> 
        
    </div>
    


)
}
export default Booking