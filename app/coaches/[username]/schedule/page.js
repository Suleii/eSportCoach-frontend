import CoachSchedule from '../../../../components/CoachSchedule';


  function CoachSchedulePage({params}) {
    return <CoachSchedule username={params.username}/>;
  }
  
  export default CoachSchedulePage;