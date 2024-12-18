import { CommentCard } from "./CommentCard";

export const ArticleComments = ({ comments }) => {
  return (
    <section className="article-comments">
      {comments.length ? <h2>Comments</h2> : null}
      {comments.map((comment) => {
        return (
          <section key={comment.comment_id}>
            <CommentCard comment={comment} />
          </section>
        );
      })}
    </section>
  );
};
