import React, { useEffect, useState } from "react";
// @ts-ignore
import * as styles from "./Article.module.scss";
import classNames from "classnames";
import Header from "./components/Header";
import Slider from "./components/sidebar";
type Props = {
  content: string;
  name: string;
  jobTitle: string;
  desc: string;
  readTime: string;
};

const Article = ({ content, name, jobTitle, desc, readTime }: Props) => {
  const [sectionIds, setSectionIds] = useState<HTMLHeadingElement[]>([]);

  useEffect(() => {
    const parseHTML = () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const sections = doc.querySelectorAll("h2");

      const ids = Array.from(sections).map((section) => section);
      setSectionIds(ids); 
    };

    parseHTML();
  }, [content]);
  const pageWrapperClass = classNames(styles.container, "pageWrapper");
  return (
    <>
      <div className={pageWrapperClass}>
        <Header name={name} desc={desc} jobTitle={jobTitle} />
        <div className={styles.contentWrapper}>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className={styles.wrapper}
          ></div>
          <Slider sectionIds={sectionIds} readTime={readTime} />
        </div>
      </div>
    </>
  );
};

export default Article;
