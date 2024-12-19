import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { getDataFromApi } from "./utils";
import { Alert } from "react-bootstrap";
import UserContext from "./Contexts";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [isError, setIsError] = useState(false);
  const [notFoundError, setNotFoundError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setNotFoundError(false);
    setIsError(false);
    getDataFromApi(`users/${username}`)
      .then(({ user }) => {
        setUsername("");
        setSuccess(true);
        localStorage.setItem("user", JSON.stringify(user));
        setTimeout(() => {
          setUser(user.username);
          navigate(-1);
        }, 700);
      })
      .catch((err) => {
        setUser(null);
        if (err.response && err.response.data.msg === "username not found") {
          setNotFoundError(true);
        } else setIsError(true);
      });
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <section className="sign-in">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Enter your username</Form.Label>
          <Form.Control
            required
            value={username}
            type="text"
            placeholder="grumpy19"
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      {notFoundError ? (
        <Alert key="invalid-username" variant="danger">
          invalid username
        </Alert>
      ) : null}
      {isError ? (
        <Alert key="request-timed-out" variant="danger">
          the request could not be processed at this time: please try again
        </Alert>
      ) : null}
      {success ? (
        <Alert key="success" variant="success">
          success! rerouting...
        </Alert>
      ) : null}
    </section>
  );
};
