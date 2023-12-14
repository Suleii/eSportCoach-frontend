"use client"
import React from 'react';
import { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {add, format} from 'date-fns'
import {useRouter} from 'next/navigation'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from '../styles/Booking.module.css';
import Modal from './Modal'


function CoachSchedule(props) {
const router = useRouter();
const token = useSelector((state) => state.user.value.token);
const [selectedDate, setSelectedDate] = useState(null);
const [open, setOpen] = useState(false);


const handleToggle = () => setOpen((prev) => !prev);

const dispatch = useDispatch();


//click on a date to display the sessions for the day
const handleDayClick = (date) => {
    handleToggle()
    setSelectedDate(date);
    fetch(`http://localhost:3000/bookings/${token}`) // search sessions according to the user's token
    .then(response=> resonse.json())
    .then(data => {
      
    })
    };
    
    
return (
<div className={styles.main}>
      <div className="container">
        {/* opens the modal */}
        {/* <button className="btn btn-primary" onClick={handleToggle}> 
          Hello
        </button> */}
        <Modal open={open}>
          <ul className="py-4">
          {listOfSessions}
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