import { Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export const Header = ({ user }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {user.username ? (
          <Link to="/profile">
            {user.avatar_url ? (
              <Image
                src={user.avatar_url}
                className="img-fluid"
                style={{ maxHeight: "40px", paddingRight: "20px" }}
                roundedCircle
              />
            ) : (
              <>
                <p>Profile</p>
              </>
            )}
          </Link>
        ) : null}

        <Navbar.Brand href="/">THE NEWS APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/articles">Browse</Nav.Link>
            {user.username ? (
              <Nav.Link href="/sign-out">Sign out</Nav.Link>
            ) : (
              <>
                <Nav.Link href="/sign-in">Sign in</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
            <Nav.Link href="/post-article">Post an article</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
