import { useState } from "react";
import { CommentCard } from "./CommentCard";
import { Alert } from "react-bootstrap";

export const ArticleComments = ({ comments, setComments }) => {
  const [isError, setIsError] = useState(false);
  return (
    <section className="article-comments">
      {comments.length ? <h2>Comments</h2> : null}
      {isError ? (
        <Alert key="danger" variant="danger">
          your delete request could not be processed at this time: please try
          again.
        </Alert>
      ) : null}
      {comments.map((comment) => {
        return (
          <section key={comment.comment_id}>
            <CommentCard
              comment={comment}
              setComments={setComments}
              setIsError={setIsError}
            />
          </section>
        );
      })}
    </section>
  );
};
