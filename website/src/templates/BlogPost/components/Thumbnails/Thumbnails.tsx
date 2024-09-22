import React from "react";
import PropTypes from "prop-types";

import PostThumbnail from "@scenes/PostThumbnail";
// @ts-ignore
import * as styles from "./Thumbnails.module.scss";

const Thumbnails = ({ items }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Other recent posts</div>
      <ul className={styles.list}>
        {items.map((item: any, index: number) => {
          return (
            <li key={index} className={styles.item}>
              <PostThumbnail {...item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Thumbnails.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default Thumbnails;
