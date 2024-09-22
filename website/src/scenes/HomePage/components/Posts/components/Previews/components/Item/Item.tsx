import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

// @ts-ignore
import * as styles from "./Item.module.scss";

const Item = ({ path, title, preview, tag }) => {
  const link = path;
  const postUrl = "/blog" + link;

  return (
    <div className={styles.container} data-automation="post-preview">
      <div className={styles.imageBox}>
        <Link to={postUrl}>
          <GatsbyImage
            image={preview.childImageSharp.gatsbyImageData}
            draggable={false}
            alt={title}
            title={title}
          />
        </Link>
      </div>
      <div className={styles.description}>
        <div className={styles.tag}>#{tag}</div>
        <div className={styles.title}>
          <Link to={postUrl} dangerouslySetInnerHTML={{ __html: title }}></Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
