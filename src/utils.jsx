import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://dhiran-news.onrender.com/api",
  timeout: 5000,
});

export const getDataFromApi = async (name, params) => {
  return apiClient.get(`/${name}`, { params }).then(({ data }) => data);
};

export const postToApi = async (name, body) => {
  return apiClient.post(`/${name}`, body);
};

export const incrementArticleVotes = async (article_id, votes) => {
  return apiClient
    .patch(`articles/${article_id}`, { inc_votes: votes })
    .then(({ data }) => data.article.votes);
};

export const deleteCommentById = async (comment_id) => {
  return apiClient.delete(`comments/${comment_id}`)
};

export default apiClient;
