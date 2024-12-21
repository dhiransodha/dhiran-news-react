import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { getDataFromApi, postToApi } from "./utils";
import { Alert, Button } from "react-bootstrap";

export const PostArticle = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.username) navigate("/register");
  }, [user, navigate]);
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [topics, setTopics] = useState([]);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    getDataFromApi("topics")
      .then(({ topics }) => {
        setTopics(topics);
        setOptions(
          topics.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })
        );
      })
      .catch(() => {
        setIsError(true);
      });
  }, [topics, options]);
  const [articleInfo, setArticleInfo] = useState({
    author: user.username,
    title: "",
    body: "",
    topic: "other",
    article_img_url: null,
    topic_other: "",
  });
  const handleClick = () => {
    setIsError(false);
    const article = { ...articleInfo };
    if (articleInfo.topic === "other") {
      article.topic = articleInfo.topic_other;
      delete article.topic_other;
      postToApi(`topics`, {
        description: "",
        slug: articleInfo.topic_other,
      })
        .then(() => {
          postToApi(`articles`, article).then(({ article }) => {
            setSuccess(true);
            setTimeout(() => {
              navigate(`/articles/${article.article_id}`);
            }, 1000);
          });
        })
        .catch(() => {
          setIsError(true);
        });
    } else {
      delete article.topic_other;
      postToApi(`articles`, article)
        .then(({ article }) => {
          setSuccess(true);
          setTimeout(() => {
            navigate(`/articles/${article.article_id}`);
          }, 1000);
        })
        .catch(() => {
          setIsError(true);
        });
    }
  };
  const handleChange = (e) => {
    setIsError(false);
    setArticleInfo((articleInfo) => {
      return { ...articleInfo, [e.target.id]: e.target.value };
    });
  };

  return (
    <section className="post-article">
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            onChange={handleChange}
            size="lg"
            placeholder="title"
            value={articleInfo.title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="body">
          <Form.Label>Body</Form.Label>
          <Form.Control
            required
            onChange={handleChange}
            as="textarea"
            style={{ height: "55vh" }}
            value={articleInfo.body}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="article_img_url">
          <Form.Label>Article Image URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="article image url"
            aria-describedby="articleImageHelpBlock"
            onChange={handleChange}
            required
          />
          <Form.Text id="articleImageHelpBlock" muted>
            Select your photo from{" "}
            <a href="https://www.pexels.com" target="_blank">
              Pexels.com
            </a>{" "}
            by right clicking on a free image and pressing 'copy image address.'
            On mobile devices simply click on the image then hold it down and
            press 'copy image' - try a landscape photo for the best results
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="topic">
          <Form.Label>Topic</Form.Label>
          <Form.Select
            required
            value={articleInfo.topic}
            onChange={handleChange}
          >
            <option value="other">Other</option>
            {options}
          </Form.Select>
        </Form.Group>
        {articleInfo.topic === "other" ? (
          <Form.Group className="mb-3" controlId="topic_other">
            <Form.Label>Please specify other topic:</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={handleChange}
              placeholder="other topic"
              value={articleInfo.topic_other}
            />
          </Form.Group>
        ) : null}
      </Form>
      <Button variant="success" onClick={handleClick}>
        Post
      </Button>
      {success ? (
        <Alert variant="success" key="success-message">
          Successfully posted article: rerouting...
        </Alert>
      ) : null}
      {isError ? (
        <Alert variant="danger" key="error-message">
          There was an error displaying content or posting: please try reloading
          the page or posting again
        </Alert>
      ) : null}
    </section>
  );
};
