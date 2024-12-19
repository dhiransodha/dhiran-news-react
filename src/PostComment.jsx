import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { postToApi } from "./utils";

export const PostComment = ({ article, setComments }) => {
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSuccess(false);
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (!comment.length) return null;
    setIsError(false);
    setIsPosting(true);
    setSuccess(false);
    if (!JSON.parse(localStorage.getItem("user"))) navigate("/sign-in");
    else {
      postToApi(`articles/${article.article_id}/comments`, {
        username: JSON.parse(localStorage.getItem("user")).username,
        body: comment,
      })
        .then(() => {
          setIsPosting(false);
          setSuccess(true);
          setCounter(counter + 1);
          setComments((comments) => [
            {
              comment_id: 9999999 + counter,
              body: comment,
              article_id: 1,
              author: JSON.parse(localStorage.getItem("user")).username,
              votes: 0,
              created_at: String(Date.now()),
            },
            ...comments,
          ]);
          setComment("");
          setTimeout(() => {
            setSuccess(false);
          }, 1500);
        })
        .catch(() => {
          setIsPosting(false);
          setIsError(true);
        });
    }
  };

  return (
    <section className="post-comment">
      <h2>Post a comment</h2>
      <Form.Control
        as="textarea"
        placeholder="Leave a comment here"
        style={{ height: "100px" }}
        maxLength={300}
        onChange={handleChange}
        value={comment}
      />
      <Button
        onClick={handleSubmit}
        variant="primary"
        type="submit"
        style={{ marginTop: "10px" }}
      >
        Submit
      </Button>
      {isError ? (
        <Alert key="request-timed-out" variant="danger">
          the request could not be processed at this time: please try again
        </Alert>
      ) : null}
      {success ? (
        <Alert key="successful-post" variant="success">
          comment posted successfully
        </Alert>
      ) : null}
      {isPosting ? <p>posting...</p> : null}
    </section>
  );
};
