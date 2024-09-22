import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image"
import PropTypes from 'prop-types';
// @ts-ignore
import * as styles from './Item.module.scss';

const Item = ({ childImageSharp }) => {
  const imageStyle = {
    width: childImageSharp.fluid.width,
    height: childImageSharp.fluid.height,
  };

  return (
    <div style={imageStyle} className={styles.container}>
      <GatsbyImage fluid={childImageSharp.fluid} alt="our team photo" />
    </div>
  );
};

Item.propTypes = {
  childImageSharp: PropTypes.object,
};

export default Item;
