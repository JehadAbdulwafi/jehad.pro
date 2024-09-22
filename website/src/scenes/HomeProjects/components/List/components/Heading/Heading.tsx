import React from "react";
import { Link } from "gatsby";
type Props = {
  title: string;
  subTitle: string;
};
// @ts-ignore
import * as styles from "./Heading.module.scss";

const Heading = ({ title, subTitle }: Props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.info}>
        <span className={styles.text}>{subTitle}</span>
        <Link to={"/portfolio"} className={styles.button}>
          <span>show more</span>
        </Link>
      </div>
    </div>
  );
};

export default Heading;
