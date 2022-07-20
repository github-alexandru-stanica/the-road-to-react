import { useState } from "react";
import { sortBy } from "lodash";
import styles from "./List.module.css";
import { ReactComponent as ArrowUp } from "./arrow-up-solid.svg";
import { ReactComponent as ArrowDown } from "./arrow-down-solid.svg";

const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, "title"),
  AUTHOR: (list) => sortBy(list, "author"),
  COMMENT: (list) => sortBy(list, "num_comments").reverse(),
  POINT: (list) => sortBy(list, "points").reverse(),
};

const List = ({ list, onRemoveItem }) => {
  const [sort, setSort] = useState({
    sortKey: "NONE",
    isReverse: false,
  });

  const handleSort = (sortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({ sortKey, isReverse });
  };

  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <span style={{ width: "40%" }}>
          <button
            type="button"
            className={
              sort.sortKey === "TITLE"
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
            onClick={() => handleSort("TITLE")}
          >
            Title
            {sort.sortKey === "TITLE" && !sort.isReverse && (
              <ArrowUp
                style={{ width: "16px", height: "16px", fill: "#fff" }}
              />
            )}
            {sort.sortKey === "TITLE" && sort.isReverse && (
              <ArrowDown
                style={{ width: "16px", height: "16px", fill: "#fff" }}
              />
            )}
          </button>
        </span>
        <span style={{ width: "30%" }}>
          <button
            type="button"
            className={
              sort.sortKey === "AUTHOR"
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
            onClick={() => handleSort("AUTHOR")}
          >
            Author
            {sort.sortKey === "AUTHOR" && !sort.isReverse && (
              <ArrowUp
                style={{ width: "16px", height: "16px", fill: "#fff" }}
              />
            )}
            {sort.sortKey === "AUTHOR" && sort.isReverse && (
              <ArrowDown
                style={{ width: "16px", height: "16px", fill: "#fff" }}
              />
            )}
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button
            type="button"
            className={
              sort.sortKey === "COMMENT"
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
            onClick={() => handleSort("COMMENT")}
          >
            Comments
            {sort.sortKey === "COMMENT" && !sort.isReverse && (
              <ArrowUp
                style={{ width: "16px", height: "16px", fill: "#fff" }}
              />
            )}
            {sort.sortKey === "COMMENT" && sort.isReverse && (
              <ArrowDown
                style={{ width: "16px", height: "16px", fill: "#fff" }}
              />
            )}
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button
            type="button"
            className={
              sort.sortKey === "POINT"
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
            onClick={() => handleSort("POINT")}
          >
            Points
            {sort.sortKey === "POINT" && !sort.isReverse && (
              <ArrowUp
                style={{ width: "16px", height: "16px", fill: "#fff" }}
              />
            )}
            {sort.sortKey === "POINT" && sort.isReverse && (
              <ArrowDown
                style={{ width: "16px", height: "16px", fill: "#fff" }}
              />
            )}
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
