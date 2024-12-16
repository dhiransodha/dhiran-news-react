import { ArticleCard } from "./ArticleCard";

export const ArticleList = ({ articles }) => {
  return (
    <>
      <div id="article-list">
        {articles.map((article, index) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </div>
    </>
  );
};
