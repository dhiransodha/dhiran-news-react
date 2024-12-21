import { useEffect, useState } from "react";
import { getDataFromApi } from "./utils";
import { Form } from "react-bootstrap";

export const Filters = ({
  searchParams,
  setSearchParams,
  filters,
  setFilters,
  setIsError,
  setIsLoading,
}) => {
  const handleChange = (e) => {
    setFilters((filters) => {
      return { ...filters, [e.target.name]: e.target.value };
    });
    const searchParams = {};
    for (let key in filters) {
      if (filters[key].length) searchParams[key] = filters[key];
      searchParams[e.target.name] = e.target.value;
    }
    setSearchParams(searchParams);
  };
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getDataFromApi("topics")
      .then(({ topics }) => {
        const topicNames = topics.map((topic) => topic.slug);
        setTopics(topicNames);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return (
    <Form className="filters">
      <Form.Label htmlFor="order">Order:</Form.Label>
      <Form.Select value={filters.order} name="order" onChange={handleChange}>
        <option value="desc">descending</option>
        <option value="asc">ascending</option>
      </Form.Select>
      <Form.Label htmlFor="sortBy">Sort by:</Form.Label>
      <Form.Select value={filters.sortBy} name="sortBy" onChange={handleChange}>
        <option value="created_at">created at</option>
        <option value="title">title</option>
        <option value="author">author</option>
        <option value="topic">topic</option>
        <option value="votes">votes</option>
        <option value="comment_count">comment count</option>
      </Form.Select>
      <Form.Label htmlFor="topic">Topic:</Form.Label>
      <Form.Select value={filters.topic} name="topic" onChange={handleChange}>
        <option value="">all</option>
        {topics.map((topic) => {
          return (
            <option key={topic} value={topic}>
              {topic}
            </option>
          );
        })}
      </Form.Select>
    </Form>
  );
};
