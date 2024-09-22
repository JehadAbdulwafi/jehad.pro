import React from "react";
import { Link } from "gatsby";
// @ts-ignore
import * as styles from "./Categories.module.scss";

const Categories = ({ items }: any) => {
  return (
    <ul className={styles.container}>
      <li className={styles.allPostsItem}>
        <Link to="/" className={styles.link}>
          Halo lab
        </Link>
      </li>
      <li>&nbsp;/&nbsp;</li>
      <li key="all posts" className={styles.allPostsItem}>
        <Link to="/blog" className={styles.link}>
          All blog posts
        </Link>
      </li>
      {items.map((item: any) => {
        const link = `/blog/${item.slug}`;

        return (
          <React.Fragment key={item.slug}>
            <li>&nbsp;/&nbsp;</li>
            <li className={styles.item}>
              <Link to={link} className={styles.link}>
                {item.name}
              </Link>
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  );
};


export default Categories;
