import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { deleteCommentById } from "./utils";
export const CommentCard = ({ comment, setComments, setIsError }) => {
  const handleClick = () => {
    setIsError(false);
    setComments((comments) => {
      return comments.filter((commentInComments) => {
        return comment.comment_id !== commentInComments.comment_id;
      });
    });
    deleteCommentById(comment.comment_id)
      .catch(() => {
        setIsError(true);
        setComments((comments) => {
          return [comment, ...comments];
        });
      });
  };
  if (/^\d+$/.test(comment.created_at))
    comment.created_at = String(new Date(Number(comment.created_at)));
  const username = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user")).username
    : null;
  return (
    <section className="comment-card">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <a href={"/articles/" + article.article_id}>
            <Card.Title>{comment.title}</Card.Title>
          </a>
          <Card.Text>
            posted at: {comment.created_at.replace(/\:\d{2}\s.+/, "")}
          </Card.Text>
          <Card.Text>author: {comment.author}</Card.Text>
          <Card.Text>{comment.body}</Card.Text>
          <Card.Text>votes: {comment.votes}</Card.Text>
          {username === comment.author ? (
            <Button onClick={handleClick} variant="danger">
              DELETE
            </Button>
          ) : null}
        </Card.Body>
      </Card>
    </section>
  );
};
