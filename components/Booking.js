"use client"
import React from 'react';
import { useState , useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {add, format} from 'date-fns'
import {useRouter} from 'next/navigation'
import { useSelector } from 'react-redux';
import {selectDate} from '../reducers/booking'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from '../styles/Booking.module.css';


function Booking(props) {
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
    const interval = 120 // in minutes

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
    if (date.selectedDate===null || sessionCount ===0) {
        setMessage('Please choose the number of sessions and a date.')
    } 
    else {
        dispatch(selectDate({date: date.dateTime, nbOfSessions: sessionCount , coach: props.username }))
        router.push('/payment')
        }
}
    console.log(date.dateTime)
return (
    <div class="flex flex-col h-screen items-center">
        <div className=' flex flex-col '>
            <p className="text-xl mb-10 items-center">Booking</p>       
            <select
                className="select select-bordered  rounded-md mb-10 flex"
                onChange={handleSessionCount}>
                <option className='btn m-1 w-100' disabled selected >Please choose the number of sessions:</option>
                <option className='hover:bg-base-100 focus:bg-base-100 w-100' value="1">1 session</option>
                <option className='hover:bg-base-100 focus:bg-base-100 w-100' value="10">10 sessions</option>
            </select>
          
           {/* <div>
                <label htmlFor="session" className="block text-sm font-medium leading-6 text-white">
                Please choose the number of sessions:
                </label>
                <select id="session"name="session" onChange={handleSessionCount}
                className="mt-2 block w-80 rounded-md border-0 py-1.5 pl-3 pr-10 text-white bg-base-100 sm:text-base sm:leading-6"
                >
                <option value="1">1 session</option>
                <option value="10">10 sessions</option>
                </select>
</div> */}

                
            <div className='flex flex-col justify-center w-full items-center'>
                    <div>
    
                        <DayPicker className={styles.rdp}
                        showOutsideDays 
                        mode="single"
                        selected={date.selectedDate}
                        onSelect={(date) => handleDayClick(date) } 
                        modifiersClassNames={{
                            selected: styles.selected,
                            today: styles.today,
                          }}
                        />
                    </div>

                    <div className='grid grid-cols-3 gap-x-6 gap-y-2 mb-10'>
                        {times.map((time,i) =>{
                            return (
                            <div key={`time-${i}`} className='rounded mt-2 h-8 w-20 text-sm border border-accent border-1.25 bg-primary hover:bg-accent text-white flex justify-center '>
                                <button type='button'  onClick={()=>{setDate((prev) => ({...prev, dateTime: time})) }}>{format(time, "kk:mm")}</button>
                            </div>
                            )
                        })}
                    </div>
        
    
            </div>
       
            {message !==''
            ?<div  className="w-80 mb-2 mx-auto flex align-center ">
                    <span className="text-xs text-accent ">{message}</span>
                </div>
            : ""
            } 
                
            <button type='button' className="w-80 mx-auto btn btn-success text-white" onClick={handleBooking}>Book my coach</button> 
     </div>  

    </div>
    


)
}
export default Booking