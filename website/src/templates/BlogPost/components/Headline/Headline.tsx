import React from "react";

import GradientText from "@components/GradientText";
// @ts-ignore
import * as styles from "./Headline.module.scss";
import { Link } from "gatsby";

type Props = {
  title: string;
  image: string;
  category: any;
  created_at: Date;
};
const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

const Headline = ({ created_at, title, image, category }: Props) => {
  const datetime = new Date(created_at);
  const formattedDatetime = new Intl.DateTimeFormat("en-US", options).format(
    datetime
  );
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <ul role="list" className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link className={styles.navigatonText} to="/blog">
              كل المقالات
            </Link>
            <span className={styles.navigatonSepar}>/</span>
          </li>
          <li className={styles.navigationItem}>
            <Link className={styles.navigatonText} to={`/blog/${category}`}>
              {category}
            </Link>
          </li>
        </ul>
        <div className={styles.heroPost}>
          <div className={styles.textBox}>
            <h1 className={styles.title}>{title}</h1>
          </div>
          <div className={styles.imageBox}>
            <img
              src={image}
              alt="blog post main image"
              loading="lazy"
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.params}>
          <span className={styles.param}>{formattedDatetime}</span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Headline;
