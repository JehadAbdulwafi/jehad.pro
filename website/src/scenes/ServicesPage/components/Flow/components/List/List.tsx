import React from "react";
import PropTypes from "prop-types";

// @ts-ignore
import * as styles from "./List.module.scss";

const List = ({ items }) => {
  return (
    <ul className={styles.container}>
      {items.map(({ title, message }, index) => {
        return (
          <li key={index} className={styles.item}>
            <div className={styles.title}>
              <span className={styles.icon}>{index + 1}</span>
              <span>{title}</span>
            </div>
            <div className={styles.message}>{message}</div>
          </li>
        );
      })}
    </ul>
  );
};

List.defaultProps = {
  items: [],
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default List;
