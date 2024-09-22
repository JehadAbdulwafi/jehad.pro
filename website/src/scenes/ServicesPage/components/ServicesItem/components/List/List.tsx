import React from "react";
import PropTypes from "prop-types";
// import useBreakpoints from 'use-breakpoints-width';

import Slider from "@components/Slider";
import Item from "./components/Item";
// import { BREAKPOINTS } from "@constants";

// @ts-ignore
import * as styles from "./List.module.scss";
import useBreakPoints from "@hooks/useBreakPoints";

const List = ({ items }) => {
  const { isTablet, isDesktop } = useBreakPoints();

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      {isDesktop || isTablet ? (
        <ul className={styles.list}>
          {items.map((item, index) => {
            return (
              <li key={index} className={styles.listItem}>
                <Item {...item} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles.wrapper}>
          <Slider settings={settings}>
            {items.map((item, index) => {
              return <Item key={index} {...item} />;
            })}
          </Slider>
        </div>
      )}
    </div>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default List;
