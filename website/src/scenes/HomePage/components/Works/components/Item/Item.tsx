import React from "react";
// @ts-ignore
import * as styles from "./Item.module.scss";
import { GatsbyImage } from "gatsby-plugin-image";

type props = {
  images: {
    childImageSharp: any;
  }[];
};

const Item = ({ images }: props) => {
  return (
    <div className={`${styles.item} swiper-slide`}>
      {images.map(({ childImageSharp }, i) => {
        return (
          <GatsbyImage
            key={i}
            className={styles.image}
            image={childImageSharp.gatsbyImageData}
            // fluid={childImageSharp.fluid}
            draggable={false}
            loading="lazy"
            alt="dribbble portfolio pic"
          />
        );
      })}
    </div>
  );
};

export default Item;
