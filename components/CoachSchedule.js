"use client";

import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment)

const now = new Date();

const events = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(new Date('2023-12-15T08:45:00-05:00').setHours(new Date('2023-12-15T08:45:00-05:00').getHours() - 3)),
    end: new Date('2023-12-15T09:45:00-05:00')
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10)
  },

  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0)
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0)
  },

  {
    id: 4,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3))
  },
  
];


export default function CoachSchedule() {
    const [eventsData, setEventsData] = useState(events);
  
    const handleSelect = ({ start, end }) => {
      console.log(start);
      console.log(end);
    };

   

    return (
      <div className="App">
        <Calendar
          views={["day", "agenda", "work_week", "month"]}
          selectable={true}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventsData}
          style={{ height: "100vh" }}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={handleSelect}
        />
      </div>
    );
  }
  