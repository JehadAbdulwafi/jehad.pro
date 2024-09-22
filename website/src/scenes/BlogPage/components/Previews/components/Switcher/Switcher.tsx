import React, { useEffect, useState } from "react";
import { Location, LocationContext } from "@reach/router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import classNames from "classnames";

import PostThumbnail from "@scenes/PostThumbnail";
// @ts-ignore
import * as styles from "./Switcher.module.scss";
import { Link } from "gatsby";
import { Props } from "../../Previews";
import { Post } from "@types/Post";

const getDefaultTabIndex = (pathname) => {
  let pathName;
  if (pathname.lastIndexOf("/") > 5) {
    let index = pathname.lastIndexOf("/");
    pathName = pathname.substring(0, index);
  } else pathName = pathname;
  switch (pathName) {
    case "all":
      return 0;
    case "/blog/development":
      return 1;
    case "/blog/design":
      return 2;
    case "/blog/insights":
      return 3;
    default:
      return 0;
  }
};

const LOAD_MORE_POSTS_AMOUNT = 3;

const INITIAL_AMOUNT_OF_POSTS = 9;

type switcherProps = {
  items: Post[];
  page: number;
  location: LocationContext;
};

const Switcher = ({ items, location, page }: switcherProps) => {
  const [numberOfRendered, setNumberOfRendered] = useState(
    INITIAL_AMOUNT_OF_POSTS
  );
  const defaultIndex = getDefaultTabIndex(location.pathname);
  const itemsDevelopment: Post[] = [];
  const itemsDesign: Post[] = [];
  const itemsInsights: Post[] = [];
  // development
  // design
  // insights
  const allCategories = [
    { title: "الكل", link: "/blog", items },
    { title: "#تطوير", link: "/blog/development", items: itemsDevelopment },
    {
      title: "#تصميم",
      link: "/blog/design",
      items: itemsDesign,
    },
    { title: "#أفكار", link: "/blog/insights", items: itemsInsights },
  ];

  items.forEach((item) => {
    if (item.category === "development") {
      itemsDevelopment.push(item);
    }

    if (item.category === "design") {
      itemsDesign.push(item);
    }

    if (item.category === "insights") {
      itemsInsights.push(item);
    }
  });

  useEffect(() => {
    if (defaultIndex !== 0) {
      const value = numberOfRendered + LOAD_MORE_POSTS_AMOUNT * (page - 1);
      setNumberOfRendered(value > items.length ? items.length : value);
    }
  }, [page]);
  const handleClick = () => {
    const value = numberOfRendered + LOAD_MORE_POSTS_AMOUNT;
    setNumberOfRendered(value > items.length ? items.length : value);
  };
  return (
    <div>
      <Tabs defaultIndex={defaultIndex} className={styles.tabsContainer}>
        <TabList className={styles.tabList}>
          {allCategories.map(({ title, link }) => {
            return (
              <Link to={link} className={styles.link} key={title}>
                <Tab key={title} className={styles.tabItem}>
                  <div>{title}</div>
                </Tab>
              </Link>
            );
          })}
        </TabList>

        {allCategories.map(({ title, items }) => {
          // const newItems = items.slice(0, numberOfRendered);
          return (
            <TabPanel key={title} className={styles.tabsContentContainer}>
              <ul className={styles.tabContentList}>
                {items.map((item) => {
                  const tabItemClass = classNames(styles.tabContentItem);
                  return (
                    <li
                      data-list-item="articles"
                      key={item.id}
                      className={tabItemClass}
                    >
                      <PostThumbnail {...item} />
                    </li>
                  );
                })}
              </ul>
              {numberOfRendered >= items.length ? null : (
                <button className={styles.button} onClick={handleClick}>
                  Load more
                </button>
              )}
            </TabPanel>
          );
        })}
      </Tabs>
    </div>
  );
};

const Wrapped = ({ items, page }: Props) => {
  return (
    <Location>
      {(locationProps) => (
        <Switcher {...locationProps} page={page} items={items} />
      )}
    </Location>
  );
};

export default Wrapped;
