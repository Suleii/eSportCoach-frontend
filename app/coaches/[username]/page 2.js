import CoachProfile from '../../../components/CoachProfile';

function CoachProfilePage({params}) {
  return <CoachProfile username={params.username}/>;
}

export default CoachProfilePage;