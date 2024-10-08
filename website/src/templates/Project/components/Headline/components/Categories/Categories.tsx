import React, { Fragment } from "react";
import { Link } from "gatsby";
// @ts-ignore
import * as styles from "./Categories.module.scss";

type Props = {
  items: {
    count: number;
    id: string;
    name: string;
    slug: string;
  }[];
};

const Categories = ({ items }: Props) => {
  if (items && items.length < 1) return null;

  return (
    <ul className={styles.categoryList}>
      <li key="All projects">
        <Link to="/portfolio" className={styles.categoryLink}>
          Portfolio
        </Link>
      </li>
      {items.map((item) => {
        let link = `/portfolio?category=${item.slug}`;

        return (
          <Fragment key={item.slug}>
            <li className={styles.categorySeparator}>/</li>
            <li key={item.id}>
              <Link to={link} className={styles.categoryLink}>
                {item.name}
              </Link>
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
};

export default Categories;
