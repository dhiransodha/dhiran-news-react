export const ArticleMain = ({ article }) => {
  return (
    <section className="article-main">
      <h2 className="article-title">{article.title}</h2>
      <img className="article-img" src={article.article_img_url} />
      <p className="article-body">{article.body}</p>
    </section>
  );
};
