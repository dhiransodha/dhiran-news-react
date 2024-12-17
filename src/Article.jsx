import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loading from "./assets/loading.json";
import Lottie from "lottie-react";
import { ArticleMain } from "./ArticleMain";
import { ArticleComments } from "./ArticleComments";
import LoadingContext, { ErrorContext } from "./Contexts";
import useApiGet from "./utils";

export const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const { isLoading } = useContext(LoadingContext);
  const { isError } = useContext(ErrorContext);
  const { get } = useApiGet();
  useEffect(() => {
    get(`articles/${article_id}`).then(({ article: articleObj }) => {
      setArticle(articleObj);
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
            <ArticleComments />
          </>
        )}
      </section>
    </>
  );
};
