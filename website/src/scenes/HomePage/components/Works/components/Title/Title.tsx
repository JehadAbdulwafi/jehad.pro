import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// @ts-ignore
import * as styles from "./Title.module.scss";

type Props = {
  icon: {
    publicURL: string;
  };
  signature: {
    publicURL: string;
  };
};

const Title = ({ icon, signature }: Props) => {
  const [dribbleTextTransform, setDribbleTextTransform] = useState<{
    transform: string;
  }>();
  const handleScroll = () => {
    setDribbleTextTransform({
      transform: `rotate(${window.pageYOffset / 3}deg)`,
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return function remove() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recent works</h2>
      <a
        className={styles.link}
        href="https://dribbble.com/jehadabdulwafi"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={signature.publicURL}
          alt="applications mobile illustrations websites"
          loading="lazy"
          className={styles.icon}
        />
        <img
          src={icon.publicURL}
          alt="dribbble logotype"
          loading="lazy"
          // className={styles.svg}
          style={dribbleTextTransform}
        />
      </a>
    </div>
  );
};

Title.propTypes = {
  icon: PropTypes.object,
  signature: PropTypes.object,
};

export default Title;
