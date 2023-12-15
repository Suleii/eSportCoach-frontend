"use client"
import React from 'react';
import { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {add, format, startOfDay, endOfDay, isWithinInterval} from 'date-fns'
import {useRouter} from 'next/navigation'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from '../styles/Booking.module.css';
import Modal from './Modal'
import Event from './Event'


function CoachSchedule(props) {
const router = useRouter();
const token = useSelector((state) => state.user.value.token);
const [selectedDate, setSelectedDate] = useState("");
const [open, setOpen] = useState(false);
const [bookings, setBookings] = useState([]);
const tokenTemp ="KsbJxFobf6hJF-rGVjW2w4qKgSeZm36X"

const handleToggle = () => {
  setOpen((prev) => !prev);
}
const dispatch = useDispatch();


//click on a date to display the sessions for the day
const handleDayClick = (date) => {
    handleToggle()
    setSelectedDate(date);
    fetch(`http://localhost:3000/bookings/${tokenTemp}`) // search sessions according to the user's token
    .then(response=> response.json())
    .then(data => {
      setBookings(data.bookings)
      
    })
    };

console.log(`All bookings = ${bookings}`)

//Filter all the bookings by date
const bookingsSelected = bookings.filter((booking) => 
  isWithinInterval(new Date(booking.date), {
    start:startOfDay(selectedDate),
    end: endOfDay(selectedDate)}))

const events = bookingsSelected.map((booking, i) => {
          return <Event key={i} game={booking.game} gamer={booking.username.user.username} date={booking.date}/>
}) 

console.log({bookingsSelected})

return (
<div className={styles.main}>
      <div className="container">
        {/* opens the modal */}
        <Modal open={open}>
          <ul className="py-4">
              {events}
          </ul>
          <div className="modal-action">
            {/* closes the modal */}
            <button className="btn btn-primary" onClick={handleToggle}>
              Close
            </button>
          </div>
        </Modal>
      </div>


        <p className="text-xl mb-10 ml-10">My Schedule</p>

        
        <div className=' flex flex-col items-center align-center'>
                
            <div className='flex flex-col justify-center w-full items-center'>
                    <div>
    
                        <DayPicker className={styles.rdp}
                        showOutsideDays 
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => handleDayClick(date) } 
                        modifiersClassNames={{
                            selected: styles.selected,
                            today: styles.today,
                          }}
                        
                        />
                    </div>
            </div>
          
     </div>  

    </div>
    


)
}
export default CoachSchedule;