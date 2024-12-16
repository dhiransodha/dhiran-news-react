import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import loading from "./assets/loading.json";
import Lottie from "lottie-react";
import { ArticleMain } from "./ArticleMain";
import apiClient from "./utils";

export const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    apiClient
      .get(`articles/${article_id}`)
      .then(({ data: { article } }) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch(() => {
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
          <p>error loading content</p>
        ) : (
          <ArticleMain article={article} />
        )}
      </section>
    </>
  );
};
