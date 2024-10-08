import React from "react";
import PropTypes from "prop-types";

import { useSiteMetadata } from "@hooks/queries";
// @ts-ignore
import * as styles from "./Block.module.scss";

const Block = ({ message }) => {
  const metadata = useSiteMetadata();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p className={styles.infoMessage}>{message.text}</p>
        <a href={`mailto:${metadata.email}`} className={styles.infoLink}>
          {message.link}
        </a>
      </div>
    </div>
  );
};

Block.propTypes = {
  banner: PropTypes.bool,
  message: PropTypes.object,
};

export default Block;
