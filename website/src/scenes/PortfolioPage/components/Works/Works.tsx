import React from "react";

import { usePortfolioWorksAssets } from "@hooks/queries";
import Title from "./components/Title";
import List from "./components/List";
// @ts-ignore
import * as styles from "./Works.module.scss";

const Works = () => {
  // const data = useDribbbleShots();
  const { arrowDown, dribbbleRed, textCircled } = usePortfolioWorksAssets();

  return (
    <div className={styles.container}>
      <Title icon={dribbbleRed} signature={textCircled} />
      {/* <List items={data} icon={arrowDown} /> */}
    </div>
  );
};

export default Works;
