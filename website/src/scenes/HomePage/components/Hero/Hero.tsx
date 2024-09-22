import React from "react";
import Folder from "./Folder";

// @ts-ignore
import * as styles from "./Hero.module.scss";
import Video from "./Video";

const Hero = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Folder />
          <Video />
        </div>
      </div>
    </section>
  );
};

export default Hero;
