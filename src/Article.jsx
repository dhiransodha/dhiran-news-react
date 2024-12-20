import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loading from "./assets/loading.json";
import Lottie from "lottie-react";
import { ArticleMain } from "./ArticleMain";
import { ArticleComments } from "./ArticleComments";
import { getDataFromApi } from "./utils";
import { Alert } from "react-bootstrap";

export const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("error loading content");
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getDataFromApi(`articles/${article_id}`)
      .then(({ article: articleObj }) => {
        setArticle(articleObj);
      })
      .then(() => {
        getDataFromApi(`articles/${article_id}/comments`).then(
          ({ comments: commentsArr }) => {
            setComments(commentsArr);
            setIsLoading(false);
          }
        );
      })
      .catch((err) => {
        if (err.response.data.msg && err.response.data.status === 404)
          setErrMsg("article not found");
        else setErrMsg("error loading content");
        setIsLoading(false);
        setIsError(true);
      });
  }, []);
  return (
    <>
      <section id="article">
        {isLoading ? (
          <Lottie animationData={loading} />
        ) : isError ? (
          <Alert key="error-message" variant="danger">
            {errMsg}
          </Alert>
        ) : (
          <>
            <ArticleMain
              article={article}
              setComments={setComments}
              setIsError={setIsError}
              setErrMsg={setErrMsg}
            />
            <ArticleComments comments={comments} setComments={setComments} />
          </>
        )}
      </section>
    </>
  );
};
