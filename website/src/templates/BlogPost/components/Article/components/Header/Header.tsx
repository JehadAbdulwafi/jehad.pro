import React from "react";
// @ts-ignore
import * as styles from "./Header.module.scss";
import { Link } from "gatsby";
type Props = {
  desc: string;
  name: string;
  jobTitle: string;
};

const Header = ({ desc, name, jobTitle }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.desc}>
        <p className={styles.text}>{desc}</p>
      </div>

      <div className={styles.author}>
        <div className={styles.autherPost}>
          <Link to={"/"} className={styles.textWrapper}>
            <p className={styles.autherName}>{name}</p>
            <span className={styles.autherJob}>{jobTitle}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
