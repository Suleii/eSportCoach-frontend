"use client"
import React from 'react';
import Calendar from 'react-calendar';
import { useState , useEffect} from 'react';
import { useDispatch } from 'react-redux';
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/DateTimepicker.module.css';
import {add, format} from 'date-fns'
import {useRouter} from 'next/navigation'
import { useSelector } from 'react-redux';
import {selectDate} from '../reducers/selectedDate'


function Booking() {
const router = useRouter();
const [sessionCount, setSessionCount] = useState(0);
const [message, setMessage] = useState('');
const [date, setDate] = useState({selectedDate: null, dateTime: null});
const [times, setTimes] = useState([]);

const dispatch = useDispatch();

//Choose how many sessions to book
const handleSessionCount = (event) => {
        setSessionCount(parseInt(event.target.value));
    };

//click on a date 
const handleDayClick = (date) => {
    setDate((prev) => ({ ...prev, selectedDate: date , dateTime: null}));
    setMessage('')
    };

//display the times after choosing the date
const getTimes = () => {
       
    if (!date.selectedDate) {
        console.log(`return`)
        return}
    const {selectedDate} = date
    const beginning = add(selectedDate, {hours: 1})
    const end = add(selectedDate, { hours: 24})
    const interval = 60 // in minutes

const times = []
    for (let i = beginning; i<= end; i=add(i, {minutes: interval})) {
            times.push(i)
        }
    setTimes(times)
    }
        
// useEffect will work everytime the date changes 
useEffect(() => {
    if (date.selectedDate) {
        getTimes();
    }
}, [date.selectedDate]);   

//click on Book will redirect to payment page if date and time are selected
const handleBooking = () => {
    if (date.selectedDate===null) {
        setMessage('Please select a date.')
    } 
    else {
        dispatch(selectDate(date.dateTime))
        router.push('/payment')
        }
}
    console.log(date.dateTime)
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
                            className="bg-neutral text-white text-lg"  
                            view='month' 
                            onClickDay={(date) => handleDayClick(date) } 
                            locale='en-GB'/>
                    </div>

                    <div className='flex flex-row flex-wrap gap-4 mt-10 justify-center'>
                        {times.map((time,i) =>{
                            return (
                            <div key={`time-${i}`} className=' rounded-sm bg-accent p-2 hover:bg-accent-focus'>
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