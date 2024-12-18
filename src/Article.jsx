import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loading from "./assets/loading.json";
import Lottie from "lottie-react";
import { ArticleMain } from "./ArticleMain";
import { ArticleComments } from "./ArticleComments";
import { getDataFromApi } from "./utils";

export const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
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
      });
  }, []);
  return (
    <>
      <section id="article">
        {isLoading ? (
          <Lottie animationData={loading} />
        ) : isError ? (
          <p>error loading content</p>
        ) : (
          <>
            <ArticleMain article={article} />
            <ArticleComments comments={comments} />
          </>
        )}
      </section>
    </>
  );
};
