import Pagination from "react-bootstrap/Pagination";

export const PageSelection = ({ limit, page, setPage, totalItems }) => {
  let active = page;
  let items = [];
  for (let number = 1; number <= Math.ceil(totalItems / limit); number++) {
    items.push(
      <Pagination.Item
        onClick={() => setPage(number)}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <Pagination>{items}</Pagination>
      <br />
    </div>
  );
};
