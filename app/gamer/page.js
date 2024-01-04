import UserProfile from "@/components/UserProfile";

function GamerPage({ params }) {
  return <UserProfile username={params.username} />;
}

export default GamerPage;
