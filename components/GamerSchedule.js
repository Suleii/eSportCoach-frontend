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


function GamerSchedule(props) {
  const user = useSelector((state) => state.user.value);

  const [token, setToken] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(false);
  const bookings = props.bookings
  const [bookingsSelected, setBookingsSelected] = useState([]);


useEffect(() => {
  fetch(`http://localhost:3000/users/credentials/${props.username}`)
  .then(response => response.json())
  .then(data => {
    setToken(data.credentials.token)
})
}, []);

//click on a date to display the sessions for the day
const handleDayClick = (date) => {
  if(user.token === token){
    setOpen((prev) => !prev);
    // update selected date
    setSelectedDate(date);
    // Filter bookings by selected day
    let bookingsoftheday = bookings.filter((booking) =>
    isWithinInterval(new Date(booking.date), {
    start: startOfDay(date),
    end: endOfDay(date)
    })
    );
    setBookingsSelected(bookingsoftheday);
    };
  }
   
  
 
  
const handleClose = () => {
  setOpen(false)
}

const bookingsDates = bookings.map((date) => new Date(date.date))

const bookingsStyles = {color : "#599c5f"}

return (
<div className="flex flex-col items-center">
  <div className='w-5/6'>
      <div className="container">
        {/* opens the modal */}
        <Modal open={open}>
          <ul className="py-4">
              {(bookingsSelected.map((booking, i) => {
                  return <Event key={i} game={booking.game} partner={booking.coachUsername.user.username} date={booking.date}  id={booking._id}/>})) 
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

        <div className=' flex flex-col items-stretch align-center'>
                 <p className="text-lg mb-7 ">My Schedule</p>
            <div className='flex flex-col justify-center w-full items-center'>
                    <div className='bg-base-100 rounded-xl'>
    
                        <DayPicker className={styles.rdp}
                        showOutsideDays 
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => handleDayClick(date) } 
                        modifiers={{ bookingsDates:bookingsDates}}
                        modifiersStyles={{bookingsDates: bookingsStyles}}
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
export default GamerSchedule;