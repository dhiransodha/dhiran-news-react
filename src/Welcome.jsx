import { Link } from "react-router-dom";

export const Welcome = () => {
  return (
    <section id="welcome">
      <div>Welcome to the news app</div>
      <div id="welcome-links">
        <Link className="welcome-link" to="/articles">Browse Articles</Link>
      </div>
    </section>
  );
};
