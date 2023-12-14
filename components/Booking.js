"use client"
import React from 'react';
import { useState , useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {add, format} from 'date-fns'
import {useRouter} from 'next/navigation'
import { useSelector } from 'react-redux';
import {selectDate} from '../reducers/selectedDate'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from '../styles/Booking.module.css';


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
    <div className={styles.main}>
        <p className="text-xl mb-10 ml-10">Booking</p>
        <div className=' flex flex-col items-center align-center'>
                
            <select
                className="select select-bordered  rounded-md mb-10 flex"
                onChange={handleSessionCount}>
                <option className='btn m-1 w-100' disabled selected >Please choose the number of sessions:</option>
                <option className='hover:bg-base-100 focus:bg-base-100 w-100' value="1">1 session</option>
                <option className='hover:bg-base-100 focus:bg-base-100 w-100' value="10">10 sessions</option>
            </select>
            

                
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
            ?<div role="alert" className="mb-2 alert alert-warning h-10 flex align-center w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span className="text-sm">{message}</span>
                </div>
            : ""
            } 
                
            <button type='button' className="w-80 btn btn-success text-white" onClick={handleBooking}>Book my coach</button> 
     </div>  

    </div>
    


)
}
export default Booking