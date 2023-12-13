import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format }from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { startOfWeek } from 'date-fns/startOfWeek'
import { getDay } from 'date-fns/getDay'
import { enGB } from 'date-fns/locale/en-GB'



function CoachSchedule(props){

  const locales = {
    'en-GB': enGB,
  }
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })

  return (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
)
}

export default CoachSchedule