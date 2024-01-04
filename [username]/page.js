import UserProfile from "../../../components/UserProfile";

function UserProfilePage({ params }) {
  return <UserProfile username={params.username} />;
}

export default UserProfilePage;
