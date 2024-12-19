import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export const Welcome = () => {
  return (
    <section id="welcome">
      <div>Welcome to the news app</div>
      <div id="welcome-links">
      <Button href='/articles' variant="dark">Browse Articles</Button>
      </div>
    </section>
  );
};
