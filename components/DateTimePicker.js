"use client"
import Calendar from 'react-calendar';
import { useState , useEffect} from 'react';
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/DateTimepicker.module.css';
import {add, format} from 'date-fns'



function DateTimePicker() {
    const [date, setDate] = useState({selectedDate: null, dateTime: null})
    const [times, setTimes] = useState([])

    console.log(date.selectedDate)

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
        console.log(times)
        setTimes(times)
    }
   
    const handleDayClick = (date) => {
        setDate((prev) => ({ ...prev, selectedDate: date }));
        console.log(`Date = ${date}`);
        };
        
    // useEffect sera déclenché chaque fois que la date change
    useEffect(() => {
        if (date.selectedDate) {
        getTimes();
        }
        }, [date.selectedDate]);
    
    return (
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
                                <button type='button' onClick={()=>setDate((prev) => ({...prev, dateTime: time}))}>{format(time, "kk:mm")}</button>
                            </div>
                            )
                        })}
                    </div>
        </div>
    </div>
)}

export default DateTimePicker