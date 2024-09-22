import React from "react";

import { usePortfolioClientsAssets } from "@hooks/queries";
// @ts-ignore
import * as styles from "./Clients.module.scss";

type item = {
  publicURL: string;
};

const Clients = () => {
  const items = usePortfolioClientsAssets();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Our Clients</h2>
      <ul className={styles.list}>
        {items.map(({ publicURL }: item) => {
          return (
            <li key={publicURL} className={styles.item}>
              <img
                src={publicURL}
                alt="client company logotype"
                loading="lazy"
                draggable="false"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Clients;
