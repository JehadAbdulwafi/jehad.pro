import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";

// @ts-ignore
import * as styles from "./PostThumbnail.module.scss";
import { Post } from "@scenes/BlogPage/components/Previews/Previews";

const PostThumbnail = ({ title, slug, image, category }: Post) => {

  const link = `/blog/${slug}`;

  return (
    <article className={styles.container}>
      <Link to={link} className={styles.link}>
        <div className={styles.thumbnail}>
          <img
            src={image}
            className={styles.image}
            alt="post preview"
            loading="lazy"
          />
        </div>
        <span className={styles.hiddenTitle}>{title}</span>
      </Link>
      <div className={styles.wrapper}>
        <p className={styles.tag} key={category}>
          #{category}
        </p>
        <h3 className={styles.title}>
          <Link to={link}>{title}</Link>
        </h3>
      </div>
    </article>
  );
};

PostThumbnail.defaultProps = {
  categories: [],
};

PostThumbnail.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  date: PropTypes.string,
  featured_media: PropTypes.object,
  categories: PropTypes.array,
  isFirst: PropTypes.bool,
};

export default PostThumbnail;
