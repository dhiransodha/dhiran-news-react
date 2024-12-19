import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
export const CommentCard = ({ comment }) => {
  if (/^\d+$/.test(comment.created_at))
    comment.created_at = String(new Date(Number(comment.created_at)));
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
        </Card.Body>
      </Card>
    </section>
  );
};
