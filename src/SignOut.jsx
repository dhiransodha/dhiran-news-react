import { useNavigate } from "react-router-dom";

export const SignOut = ({ setUser }) => {
  const navigate = useNavigate();
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: null,
      name: null,
      avatar_url: "src/assets/blank-profile-picture.png",
    })
  );
  setUser({
    username: null,
    name: null,
    avatar_url: "src/assets/blank-profile-picture.png",
  });
  setTimeout(() => {
    navigate('/');
  }, 2000);
  return (
    <section className="sign-out">
      <p>signing out...</p>
    </section>
  );
};
