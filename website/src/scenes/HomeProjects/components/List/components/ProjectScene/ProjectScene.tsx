import React, { Fragment } from "react";
import Img from "gatsby-image";
import PropTypes from "prop-types";

// @ts-ignore
import * as styles from "./ProjectScene.module.scss";
import { StaticImage } from "gatsby-plugin-image";
// import { StaticImage } from "gatsby-plugin-image";
import SlideHover from "@components/SlideHover";

type props = {
  link: string;
  linkTitle: string;
  preview: any;
  tags: string;
  title: string;
  alt: string;
  imgTitle: string;
  technologies: {
    name: string;
    icon: any;
  }[];
  reversed: number;
};

const ProjectScene = ({
  link,
  linkTitle,
  preview,
  reversed,
  technologies,
  tags,
  title,
  alt,
  imgTitle,
}: props) => {
  return (
    <Fragment>
      <div className={`${styles.preview} ${reversed ? styles.reversed : ""}`}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Img
            fluid={preview.childImageSharp.fluid}
            draggable={false}
            alt={alt}
            title={imgTitle}
          />
          <span className={styles.hiddenTitle}>{title}</span>
        </a>
      </div>
      <div
        className={`${styles.description} ${reversed ? styles.reversed : ""}`}
      >
        <div className={styles.tags}>{tags}</div>
        <div className={styles.title}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </div>

        <div className={styles.descriptionLink}>
          <SlideHover>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {linkTitle}
            </a>
          </SlideHover>
        </div>

        <ul className={styles.technologies}>
          {technologies.map(({ name, icon }, index) => (
            <li key={index} className={styles.technologiesItem}>
              <img
                src={icon.publicURL}
                alt="technologies item icon"
                loading="lazy"
                className={styles.technologyIcon}
              />
              <div className={styles.technologyName}>{name}</div>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};
ProjectScene.propTypes = {
  link: PropTypes.string,
  linkTitle: PropTypes.string,
  preview: PropTypes.object,
  reversed: PropTypes.bool,
  technologies: PropTypes.arrayOf(PropTypes.object),
  tags: PropTypes.string,
  title: PropTypes.string,
  alt: PropTypes.string,
  imgTitle: PropTypes.string,
  xys: PropTypes.any,
};
export default ProjectScene;
