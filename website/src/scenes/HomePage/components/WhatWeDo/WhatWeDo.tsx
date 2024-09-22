import React from "react";
// @ts-ignore
import * as styles from "./WhatWeDo.module.scss";

const WhatWeDo = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        Driving your business forward with strong products
      </h1>
      <span className={styles.description}>
        We are a full-service digital agency that builds immersive user
        experience. Our team creates an exceptional visualization and
        thought-out functionality. We believe, our clients deserve to be
        remarkable in their business. The studio develops the products people
        appreciate all around the world.
      </span>
    </section>
  );
};

export default WhatWeDo;
