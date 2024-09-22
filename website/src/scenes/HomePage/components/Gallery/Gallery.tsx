import React from "react";
import { useHomeGalleryAssets } from "../../../../hooks/queries";
// import Img from "gatsby-image";
import ScrollGallery from "../../../../components/ScrollGallery/ScrollGallery";

// @ts-ignore
import * as styles from "./Gallery.module.scss";
import { GatsbyImage } from "gatsby-plugin-image";

const Gallery = () => {
  const { photos } = useHomeGalleryAssets();

  const photosList = photos.map(({ childImageSharp }) => {
    return {
      name: childImageSharp.gatsbyImageData.images.fallback.src,
      element: (
        <div
          className={styles.item}
          key={childImageSharp.gatsbyImageData.images.fallback.src}
        >
          <div className={styles.card}>
            <GatsbyImage
              image={childImageSharp.gatsbyImageData}
              alt={childImageSharp.gatsbyImageData.alt}
              title={childImageSharp.gatsbyImageData.title}
              style={{
                width: childImageSharp.gatsbyImageData.width,
                height: childImageSharp.gatsbyImageData.height,
              }}
            />
          </div>
        </div>
      ),
    };
  });

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Creative Atmosphere</h2>
      <ScrollGallery step={5}>
        {photosList.map(({ element }) => {
          return element;
        })}
      </ScrollGallery>
    </section>
  );
};

export default Gallery;
