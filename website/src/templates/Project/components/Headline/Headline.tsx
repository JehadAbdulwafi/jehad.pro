import React from "react";
import classNames from "classnames";

import Categories from "./components/Categories";
import GradientText from "@components/GradientText";
// @ts-ignore
import * as styles from "./Headline.module.scss";
// @ts-ignore
import { Project } from "@types/Project";

const NextProjectCategory = () => (
  <div className={styles.nextProjectCategory}>Next Project</div>
);

type Props = {
  data: Project;
  truncated?: boolean;
};

const Headline = ({ data, truncated }: Props) => {
  const { categories, title } = data;

  // Classnames
  const styleImageBox = classNames(styles.imageBox, {
    [styles.nextImageBox]: truncated,
  });

  const styleHeadline = truncated ? styles.headlineTruncated : styles.headline;

  const links = truncated ? (
    <NextProjectCategory />
  ) : (
    <Categories items={categories} />
  );

  return (
    <div className={styleHeadline}>
      <div className={styles.container}>
        <div className={styles.planetsWrapper}>
          <div className={styles.titleCategoryWrap}>
            {links}
            <h1 className={styles.title}>
              <GradientText text={title} />
            </h1>
          </div>
        </div>
        <div className={styleImageBox}>
          <img
            src={data.featured_media.source_url}
            alt="project picture"
            loading="lazy"
            className={styles.picture}
          />
        </div>
      </div>
    </div>
  );
};

export default Headline;
