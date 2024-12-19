import { useNavigate } from "react-router-dom";

export const SignOut = ({ setUser }) => {
  const navigate = useNavigate();
  localStorage.setItem("user", null);
  setUser(null);
  setTimeout(() => {
    navigate(-1);
  }, 2000);
  return (
    <section className="sign-out">
      <p>signing out...</p>
    </section>
  );
};
