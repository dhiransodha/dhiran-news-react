import { ArticleCard } from "./ArticleCard";

export const ArticleList = ({ articles, setArticles, setIsError }) => {
  return (
    <>
      <div id="article-list">
        {articles.map((article, index) => {
          return <ArticleCard article={article} setArticles={setArticles} setIsError={setIsError} key={article.article_id} />;
        })}
      </div>
    </>
  );
};
