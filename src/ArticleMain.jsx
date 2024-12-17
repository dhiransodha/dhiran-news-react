export const ArticleMain = ({ article }) => {
  return (
    <section className="article-main">
      <h2 className="article-title">{article.title}</h2>
      <p className="article-author">
        by {article.author} on {article.created_at.replace(/:00\s.+$/, "")}
      </p>
      <img className="article-img" src={article.article_img_url} />
      <p className="article-body">{article.body}</p>
    </section>
  );
};
