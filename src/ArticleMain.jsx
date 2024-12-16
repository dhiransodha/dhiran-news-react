export const ArticleMain = ({ article }) => {
  return (
    <section id="article-main">
      <h2>{article.title}</h2>
      <img className="article-img" src={article.article_img_url} />
      <p>{article.body}</p>
    </section>
  );
};
