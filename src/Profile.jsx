export const Profile = ({ user }) => {
  return (
    <section className="profile">
      <h1>Name: {user.name}</h1>
      <h2>Username: {user.username}</h2>
      <img src={user.avatar_url} alt="profile-pic" />
    </section>
  );
};
