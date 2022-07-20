import { useState } from "react";
import { sortBy } from "lodash";
import styles from "./List.module.css";

const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, "title"),
  AUTHOR: (list) => sortBy(list, "author"),
  COMMENT: (list) => sortBy(list, "num_comments").reverse(),
  POINT: (list) => sortBy(list, "points").reverse(),
};

const List = ({ list, onRemoveItem }) => {
  const [sort, setSort] = useState("NONE");

  const handleSort = (sortKey) => {
    setSort(sortKey);
  };

  const sortFunction = SORTS[sort];
  const sortedList = sortFunction(list);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <span style={{ width: "40%" }}>
          <button
            type="button"
            className={
              sort === "TITLE"
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
            onClick={() => handleSort("TITLE")}
          >
            Title
          </button>
        </span>
        <span style={{ width: "30%" }}>
          <button
            type="button"
            className={
              sort === "AUTHOR"
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
            onClick={() => handleSort("AUTHOR")}
          >
            Author
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button
            type="button"
            className={
              sort === "COMMENT"
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
            onClick={() => handleSort("COMMENT")}
          >
            Comments
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button
            type="button"
            className={
              sort === "POINT"
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
            onClick={() => handleSort("POINT")}
          >
            Points
          </button>
        </span>
        <span style={{ width: "10%" }}>Actions</span>
      </div>

      {sortedList.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </div>
  );
};

const Item = ({ item, onRemoveItem }) => {
  return (
    <li style={{ display: "flex" }}>
      <span style={{ width: "40%" }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: "30%" }}>{item.author}</span>
      <span style={{ width: "10%" }}>{item.num_comments}</span>
      <span style={{ width: "10%" }}>{item.points}</span>
      <span style={{ width: "10%" }}>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </span>
    </li>
  );
};

export { List, Item };
