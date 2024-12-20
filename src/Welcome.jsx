import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export const Welcome = ({ user }) => {
  return (
    <section id="welcome">
      {user.username ? (
        <h2>Welcome back {user.name}</h2>
      ) : (
        <h2>Welcome to the news app</h2>
      )}

      <div id="welcome-links">
        <Button href="/articles" variant="dark">
          Browse Articles
        </Button>
      </div>
    </section>
  );
};
