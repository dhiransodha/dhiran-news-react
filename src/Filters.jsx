import axios from "axios";
import { useEffect, useState } from "react";

export const Filters = ({ setFilters }) => {
  const handleChange = (e) => {
    setFilters((filters) => {
      return { ...filters, [e.target.name]: e.target.value };
    });
  };
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    axios
      .get(`https://dhiran-news.onrender.com/api/topics`)
      .then(({ data: { topics } }) => {
        const topicNames = topics.map((topic) => topic.slug);
        setTopics(topicNames);
      });
  }, []);
  return (
    <form id="filters">
      <label htmlFor="order">order:</label>
      <select name="order" onChange={handleChange}>
        <option value="desc">descending</option>
        <option value="asc">ascending</option>
      </select>
      <label htmlFor="sortBy">sort by:</label>
      <select name="sortBy" onChange={handleChange}>
        <option value="created_at">posted at</option>
        <option value="title">title</option>
        <option value="author">author</option>
        <option value="topic">topic</option>
        <option value="votes">votes</option>
        <option value="comment_count">comment count</option>
      </select>
      <label htmlFor="topic">topic:</label>
      <select name="topic" onChange={handleChange}>
        <option value="">all</option>
        {topics.map((topic) => {
          return (
            <option key={topic} value={topic}>
              {topic}
            </option>
          );
        })}
      </select>
    </form>
  );
};
