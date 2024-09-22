import React from "react";
// @ts-ignore
import * as styles from "./Item.module.scss";
type props = {
  author: string;
  companyLogo: {
    publicURL: string;
  };
  generalLogo: {
    publicURL: string;
  };
  rating: string;
  stars: {
    publicURL: string;
  };
  text: string;
};

const Item = ({ author, generalLogo, rating, stars, text }: props) => {
  return (
    <div className={`${styles.container}`}>
      <div className={styles.rating}>
        <span className={styles.mark}>{rating}</span>
        <img src={stars.publicURL} alt="stars" className={styles.stars} />
      </div>
      <div className={styles.review}>
        <h1 className={styles.text}>{text}</h1>
      </div>
      <div className={styles.author}>
        <img
          src={generalLogo.publicURL}
          alt="general logotype"
          loading="lazy"
          className={styles.generalLogo}
        />
        <div className={`${styles.name}`}>&#8212;&#8194;{author}</div>
      </div>
    </div>
  );
};

export default Item;
