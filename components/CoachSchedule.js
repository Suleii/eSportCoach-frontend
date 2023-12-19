"use client"
import React from 'react';
import { useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
import {startOfDay, endOfDay, isWithinInterval, isSameDay} from 'date-fns'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from '../styles/CoachSchedule.module.css';
import Modal from './Modal'
import Event from './Event'


function CoachSchedule(props) {
const user = useSelector((state) => state.user.value);
const [profile, setProfile]=useState([])
const [selectedDate, setSelectedDate] = useState("");
const [open, setOpen] = useState(false);
const [bookings, setBookings] = useState([]);
const [bookingsSelected, setBookingsSelected] = useState([]);
const [checkbox, setCheckbox] = useState(false)
const [disabledDays, setDisabledDays] = useState([])

//Get the coach profile
useEffect(()=> {
  fetch(`http://localhost:3000/coaches/profile/${props.username}`)
    .then(response => response.json())
    .then(data => {
    setProfile(data.profile);
    })
},[])


//Get all bookings for this coach
useEffect(() => {
    fetch(`http://localhost:3000/bookings/${props.username}`) // search sessions according to the user's token
    .then(response=> response.json())
    .then(data => {
      setBookings(data.bookings)
      })

     //Get all unavailabilities 
    fetch(`http://localhost:3000/unavailabilities/${props.username}`)
      .then(response => response.json())
      .then(data => {
        setDisabledDays(data.unavailabilities)
      })

  },[selectedDate])


  
//click on a date to display the sessions for the day
const handleDayClick = (date) => {
  setOpen((prev) => !prev);
  setSelectedDate(date); // updates selected date
  
  // Filter bookings by selected day
  let bookingsoftheday = bookings.filter((booking) =>
  isWithinInterval(new Date(booking.date), {
  start: startOfDay(date),
  end: endOfDay(date)
  })
  );
  setBookingsSelected(bookingsoftheday);
  };
  
useEffect(() => {
  // Check id selected date is an unavailable days
  let datesdisabled = disabledDays.some((day) => isSameDay(new Date(day.date), new Date(selectedDate)));
  
  
  // Update checkbox status according to selected day status
setCheckbox(datesdisabled);
  }, [selectedDate, disabledDays]);
  

const handleClose = () => {
  console.log(selectedDate, profile._id)
  if(checkbox){
    fetch("http://localhost:3000/unavailabilities", {
      method: 'POST',
			headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate , coachUsername: profile._id}),

    })
    .then(response => response.json())
    .then(data => console.log(data) )
  }else{
    
    
      fetch("http://localhost:3000/unavailabilities", {
      method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate , coachUsername: profile._id}),
    })
    .then(response => response.json())
    .then(data => console.log(data.message) )
    console.log("else")
  }
  setOpen((prev) => !prev);
  setSelectedDate("")
}


const disabledDates = disabledDays.map((date) => new Date(date.date))
const disabledStyles = {color : "#C0C0CB"}
const bookingsDates = bookings.map((date) => new Date(date.date))
console.log(bookingsDates)
const bookingsStyles = {color : "#599c5f"}

return (
<div className="flex flex-col items-center min-h-screen">
  <div className='w-5/6 flex-1'>
      <div className="container">
        {/* opens the modal */}
        <Modal open={open}>
          <ul className="py-4">
              {bookingsSelected.length > 0 
                ? (bookingsSelected.map((booking, i) => {
                  return <Event key={i} game={booking.game} partner={booking.username.user.username} date={booking.date} coach={booking.coachUsername} id={booking._id}/>}))
                : <div className="form-control bg-base-100 rounded-md flex ">
                    <div className="flex">
                        <input
                        id="c1"
                        type="checkbox"
                        className="appearance-none rounded-sm h-4 w-4 cursor-pointer bg-white  focus:ring-success ring-2 ring-info focus:ring-2 checked:bg-success"
                        onChange={()=>setCheckbox(!checkbox)}
                        checked={checkbox? true : false}/>
                        <p className="pl-4 text-xs">
                        I am not available on this day
                        </p>
                    </div>
                </div>
                  
              }
          </ul>
          <div className="modal-action">
              {/* closes the modal */}
              <button className="btn btn-primary" onClick={handleClose}>
                Close
              </button>
          </div>
        </Modal>
      </div>


       

        
        <div className=' flex flex-col items-center align-center'>
                 <p className="text-xl mb-7 ">My Schedule</p>
            <div className='flex flex-col justify-center w-full items-center'>
                    <div className='bg-base-100 rounded-xl'>
    
                        <DayPicker className={styles.rdp}
                        showOutsideDays 
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => handleDayClick(date) } 
                        modifiers={{disabledDates: disabledDates, bookingsDates:bookingsDates}}
                        modifiersStyles={{disabledDates: disabledStyles, bookingsDates: bookingsStyles}}
                        modifiersClassNames={{
                            selected: styles.selected,
                            today: styles.today,
                          }}
                        
                        />
                    </div>
            </div>
          
     </div>  
     </div>
    </div>
    


)
}
export default CoachSchedule;