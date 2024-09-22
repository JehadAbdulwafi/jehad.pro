import React, { useEffect, useRef, useState } from "react";

import { Link } from "gatsby";
// @ts-ignore
import * as styles from "./Sidebar.module.scss";
import classNames from "classnames";
type Props = {
  sectionIds: HTMLHeadingElement[];
  readTime: string;
};
const Sidebar = ({ sectionIds, readTime }: Props) => {
  let oldScrollPosition = 0;
  const stickyRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollYProgress, setScrollYProgress] = useState(0);
  const [isHeaderShow, setIsHeaderShow] = useState(true);
  let scrollPosition = null;

  useEffect(() => {
    let requestId: number;
    let stickyTopPosition: number;

    const handleScroll = () => {
      requestId = requestAnimationFrame(() => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const totalHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / totalHeight) * 100;
        setScrollYProgress(scrollProgress);

        scrollPosition =
          window.pageYOffset || document.documentElement.scrollTop;
        if (scrollPosition - oldScrollPosition > 0) {
          setIsHeaderShow(false);
        } else {
          setIsHeaderShow(true);
        }

        oldScrollPosition = scrollPosition;

        if (!stickyRef.current) return;

        if (stickyTopPosition === undefined) {
          const stickyElement = stickyRef.current;
          const rect = stickyElement.getBoundingClientRect();
          stickyTopPosition = rect.top + window.pageYOffset;
        }

        if (window.pageYOffset > stickyTopPosition - 40) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      cancelAnimationFrame(requestId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div
        ref={stickyRef}
        className={classNames(styles.sliderTOC, {
          [styles.sticky]: isSticky,
          [styles.show]: isHeaderShow,
        })}
      >
        <div className={styles.toc}>
          <h2 className={styles.title}>اقسام المقالة</h2>
          <div className={styles.listScroll}>
            <ol className={styles.list}>
              {sectionIds.map((sectionId, i) => {
                return (
                  <li className={styles.listItem}>
                    <Link
                      to={`#${sectionId.id}`}
                    >{`${sectionId.innerHTML}`}</Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
        <div className={styles.wrapperProgress}>
          <div className={styles.progress}>
            <div
              className={styles.innerProgress}
              style={{ width: `${scrollYProgress}%` }}
            ></div>

            <div className={styles.WrapperReadTime}>
              <h2
                className={styles.readTime}
              >{`وقت القراءة ${readTime}دقيقة`}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
