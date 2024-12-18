import { useEffect, useState } from "react";
import { ArticleList } from "./ArticleList";
import Lottie from "lottie-react";
import loading from "./assets/loading.json";
import { PageSelection } from "./PageSelection";
import { Filters } from "./Filters";
import { getDataFromApi } from "./utils";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [filters, setFilters] = useState({
    order: "desc",
    sortBy: "created_at",
    topic: "",
  });
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
    }).then((data) => {
      setIsLoading(false);
      setArticles(data.articles);
      setTotalItems(data.total_count);
    });
  }, [page, filters]);
  return (
    <section id="articles">
      <Filters setFilters={setFilters} setIsError={setIsError} setIsLoading={setIsLoading}/>
      {isLoading ? (
        <Lottie animationData={loading} />
      ) : isError ? (
        <p>error loading content</p>
      ) : (
        <>
          <ArticleList articles={articles} />
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
