import UserSettings from "../../../../components/UserSettings";

function UserSettingsPage({ params }) {
  return <UserSettings username={params.username} />;
}

export default UserSettingsPage;
