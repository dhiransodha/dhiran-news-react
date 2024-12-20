import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { deleteArticleById } from "./utils";
import { Button } from "react-bootstrap";
export const ArticleCard = ({ article, setArticles, setIsError }) => {
  const handleClick = () => {
    setIsError(false);
    setArticles((articles) => {
      return articles.filter((articleInArticles) => {
        return article.article_id !== articleInArticles.article_id;
      });
    });
    deleteArticleById(article.article_id).catch(() => {
      setIsError(true);
      setArticles((articles) => {
        return [article, ...articles];
      });
    });
  };
  const username = JSON.parse(localStorage.getItem("user")).username;
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
            posted at: {article.created_at.replace(/\:\d{2}\s.+/, "")}
          </Card.Text>
          {username === article.author ? (
            <Button onClick={handleClick} variant="danger">
              DELETE
            </Button>
          ) : null}
        </Card.Body>
      </Card>
    </section>
  );
};
