"use client"
import React from 'react';
import { useState , useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {add, format, subDays} from 'date-fns'
import {useRouter} from 'next/navigation'
import { useSelector } from 'react-redux';
import {selectDate} from '../reducers/booking'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from '../styles/Booking.module.css';


function Booking(props) {
const router = useRouter();
const [message, setMessage] = useState('');
const [date, setDate] = useState({selectedDate: null, dateTime: null});
const [times, setTimes] = useState([]);
const [games, setGames]= useState([])
const [gameSelected, setGameSelected]= useState('')

const dispatch = useDispatch();

// disable booking for days before today
const disabledDays = [
    { from: new Date(2023, 1, 1), to: new Date(subDays(new Date(), 1)) }
  ];
  

// Fetch the games listed in the coach profile
useEffect(() => {
    fetch(`http://localhost:3000/coaches/profile/${props.username}`)
    .then(response => response.json())
    .then(data => {
    let gamesData=data.profile.games;
    setGames(gamesData);
    });
  }, [])

const gamesList = games.map((data, i) =>
<option className='hover:bg-base-100 focus:bg-base-100 w-100' value={data}>{data}</option>
)

//Choose how many sessions to book
const handleGameSelection = (event) => {
        setGameSelected(event.target.value);
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
    if (date.selectedDate===null || gameSelected ==="") {
        setMessage('Please choose the game and date.')
    } 
    else {
        dispatch(selectDate({date: date.dateTime, game: gameSelected , coach: props.username, }))
        router.push('/payment')
        }
}
    console.log(date.dateTime)
return (
    <div className="flex flex-col items-center ">
        <div className=' flex flex-col w-5/6 flex-1'>
            <p className="text-xl mb-10 items-center">Booking</p>       
            <select
                className="select select-bordered  rounded-md mb-10 flex"
                onChange={handleGameSelection}
                defaultValue={'question'}>
                <option className='btn m-1 w-100' disabled value="question" >Please choose your game:</option>
                {games.length>0 
                ?(gamesList)
                : <option className='btn m-1 w-100' value="" disabled >No games for this coach</option>
                }
                
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
                        disabled={disabledDays}/>
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