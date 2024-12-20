import { Button } from "react-bootstrap";
import { PostComment } from "./PostComment";
import VoteCard from "./VoteCard";
import { useNavigate } from "react-router-dom";
import { deleteArticleById } from "./utils";

export const ArticleMain = ({
  article,
  setComments,
  setIsError,
  setErrMsg,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setIsError(false);
    deleteArticleById(article.article_id)
      .then(() => {
        navigate("/articles");
      })
      .catch(() => {
        setErrMsg("could not delete article at this time: please try again");
        setIsError(true);
      });
  };
  const username = JSON.parse(localStorage.getItem("user")).username;
  return (
    <section className="article-main">
      <h2 className="article-title">{article.title}</h2>
      <p className="article-author">
        by {article.author} on {article.created_at.replace(/:00\s.+$/, "")}
      </p>
      {username === article.author ? (
        <Button onClick={handleClick} variant="danger">
          DELETE
        </Button>
      ) : (
        <VoteCard objToIncrement={article} typeName={"article"} />
      )}
      {article.article_img_url ? (
        <img className="article-img" src={article.article_img_url} />
      ) : null}
      <p className="article-body">{article.body}</p>
      <PostComment article={article} setComments={setComments} />
    </section>
  );
};
