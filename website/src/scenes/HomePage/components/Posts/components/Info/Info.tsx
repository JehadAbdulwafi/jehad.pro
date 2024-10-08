import React from "react";
import { Link } from "gatsby";
import SlideHover from "@components/SlideHover";
// @ts-ignore
import * as styles from "./Info.module.scss";

const Info = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Front-end &amp; back-end expertise from development to delivery
      </div>
      <SlideHover>
        <Link to="/blog" className={styles.link}>
          MORE BLOG POSTS
        </Link>
      </SlideHover>
    </div>
  );
};

export default Info;
