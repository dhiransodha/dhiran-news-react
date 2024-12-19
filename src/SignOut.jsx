import { useNavigate } from "react-router-dom";

export const SignOut = () => {
  const navigate = useNavigate();
  localStorage.setItem("user", null);
  setTimeout(() => {
    navigate(-1);
  }, 2000);
  return (
    <section className="sign-out">
      <p>signing out...</p>
    </section>
  );
};
