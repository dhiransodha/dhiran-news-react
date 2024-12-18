import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
export const ArticleCard = ({ article }) => {
  return (
    <section className="article-card">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={article.article_img_url} />
        <Card.Body>
          <Link to={"/articles/" + article.article_id}>
            <Card.Title>{article.title}</Card.Title>
          </Link>
          <Card.Text>author: {article.author}</Card.Text>
          <Card.Text>topic: {article.topic}</Card.Text>
          <Card.Text>comment count: {article.comment_count}</Card.Text>
          <Card.Text>votes: {article.votes}</Card.Text>
          <Card.Text>
            posted at: {article.created_at.replace(/\:00\s.+/, "")}
          </Card.Text>
        </Card.Body>
      </Card>
    </section>
  );
};
