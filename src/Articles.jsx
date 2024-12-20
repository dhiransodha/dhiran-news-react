import { useEffect, useState } from "react";
import { ArticleList } from "./ArticleList";
import Lottie from "lottie-react";
import loading from "./assets/loading.json";
import { PageSelection } from "./PageSelection";
import { Filters } from "./Filters";
import { getDataFromApi } from "./utils";
import { useSearchParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("error loading content");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchParams = {
    order: "desc",
    sortBy: "created_at",
    topic: "",
  };
  if (searchParams.get("order"))
    initialSearchParams.order = searchParams.get("order");
  if (searchParams.get("sortBy"))
    initialSearchParams.sortBy = searchParams.get("sortBy");
  if (searchParams.get("topic"))
    initialSearchParams.topic = searchParams.get("topic");
  const [filters, setFilters] = useState(initialSearchParams);
  const limit = 8;
  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getDataFromApi("articles", {
      topic: filters.topic,
      sort_by: filters.sortBy,
      order: filters.order,
      limit: limit,
      p: page,
    })
      .then((data) => {
        setIsLoading(false);
        if (!data.articles.length) {
          setIsError(true);
          setErrMsg(
            "no articles returned: try reloading the page or selecting a different topic"
          );
        }
        setArticles(data.articles);
        setTotalItems(data.total_count);
      })
      .catch(({ response }) => {
        setIsLoading(false);
        setIsError(true);
        if (response.data.msg) setErrMsg("order or sort by query is invalid");
      });
  }, [page, filters]);
  return (
    <section id="articles">
      <Filters
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        filters={filters}
        setFilters={setFilters}
        setIsError={setIsError}
        setIsLoading={setIsLoading}
      />
      {isLoading ? (
        <Lottie animationData={loading} />
      ) : isError ? (
        <Alert key="error-message" variant="danger">
          {errMsg}
        </Alert>
      ) : (
        <>
          <ArticleList articles={articles} setArticles={setArticles} setIsError={setIsError} />
          <PageSelection
            totalItems={totalItems}
            page={page}
            setPage={setPage}
            limit={limit}
          />
        </>
      )}
    </section>
  );
};
