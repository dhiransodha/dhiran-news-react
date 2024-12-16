import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <section id="header">
      <h1>
        <Link to="/">NEWS APP</Link>
      </h1>
      <div>
        <img />
        Sign in
      </div>
      <div>
        <img />
        Search
      </div>
    </section>
  );
};
