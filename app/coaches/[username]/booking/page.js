import Booking from '../../../../components/Booking';

function BookingPage({params}) {
  return <Booking username={params.username}/>;
}

export default BookingPage;