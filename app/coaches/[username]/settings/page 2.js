import CoachSettings from '../../../../components/CoachSettings';


  function CoachSettingsPage({params}) {
    return <CoachSettings username={params.username}/>;
  }
  
  export default CoachSettingsPage;