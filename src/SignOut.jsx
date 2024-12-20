import { useNavigate } from "react-router-dom";
import blankProfilePicture from "./assets/blank-profile-picture.png";

export const SignOut = ({ setUser }) => {
  const navigate = useNavigate();
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: null,
      name: null,
      avatar_url: blankProfilePicture,
    })
  );
  setUser({
    username: null,
    name: null,
    avatar_url: blankProfilePicture,
  });
  setTimeout(() => {
    navigate("/");
  }, 1200);
  return (
    <section className="sign-out">
      <p>signing out...</p>
    </section>
  );
};
