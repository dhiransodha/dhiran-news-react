import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { postToApi } from "./utils";
import { useNavigate } from "react-router-dom";

export const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    name: "",
    avatar_url: "",
  });
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [errMsg, setErrMsg] = useState(
    "user registration could not be processed at this time: please try again"
  );
  const handleClick = (e) => {
    setIsPosting(true);
    setIsError(false);
    postToApi("users", registerInfo)
      .then(({user}) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setIsPosting(false);
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 1200);
      })
      .catch(({ response }) => {
        setIsPosting(false);
        setIsError(true);
        if (response.data.msg !== "bad request") setErrMsg(response.data.msg);
        console.log(response.data.msg);
      });
  };
  const handleChange = (e) => {
    setRegisterInfo((registerInfo) => {
      return { ...registerInfo, [e.target.id]: e.target.value };
    });
  };
  return (
    <section className="register">
      <Form.Label htmlFor="username">Username</Form.Label>
      <Form.Control
        type="text"
        id="username"
        onChange={handleChange}
        required
      />
      <Form.Label htmlFor="Name">Name</Form.Label>
      <Form.Control type="text" id="name" onChange={handleChange} required />
      <Form.Label htmlFor="avatar_url">Avatar URL</Form.Label>
      <Form.Control
        type="url"
        id="avatar_url"
        aria-describedby="avatarHelpBlock"
        onChange={handleChange}
        required
      />
      <Form.Text id="avatarHelpBlock" muted>
        Select your photo from{" "}
        <a href="https://www.pexels.com" target="_blank">
          Pexels.com
        </a>{" "}
        by right clicking on a free image and pressing 'copy image address'
      </Form.Text>
      <Button variant="success" onClick={handleClick}>
        Register
      </Button>
      {isPosting ? (
        <Alert variant="dark" key="registering">
          registering...
        </Alert>
      ) : null}
      {success ? (
        <Alert variant="success" key="success">
          Successfully registered! rerouting...
        </Alert>
      ) : null}
      {isError ? (
        <Alert variant="danger" key="error-message">
          {errMsg}
        </Alert>
      ) : null}
    </section>
  );
};
