import { useContext, useEffect, useState } from "react";
import { ArticleList } from "./ArticleList";
import Lottie from "lottie-react";
import loading from "./assets/loading.json";
import { PageSelection } from "./PageSelection";
import { Filters } from "./Filters";
import LoadingContext, { ErrorContext } from "./Contexts";
import useApiGet from "./utils";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const { isLoading } = useContext(LoadingContext);
  const { isError } = useContext(ErrorContext);
  const [filters, setFilters] = useState({
    order: "desc",
    sortBy: "created_at",
    topic: "",
  });
  const limit = 4;
  const { get } = useApiGet();
  useEffect(() => {
    get("articles", {
      topic: filters.topic,
      sort_by: filters.sortBy,
      order: filters.order,
      limit: limit,
      p: page,
    }).then((data) => {
      setArticles(data.articles);
      setTotalItems(data.total_count);
    });
  }, [page, filters]);
  return (
    <section id="articles">
      <Filters setFilters={setFilters} />
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
