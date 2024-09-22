import React from "react";
// import MailUs from "@scenes/MailUs";
import Testimonials from "./components/Testimonials";
import Works from "./components/Works";

import { SpringValue } from "react-spring";
import "swiper/css";
// @ts-ignore
import * as styles from "./HomePage.module.scss";
import WhatWeDo from "./components/WhatWeDo";
import Hero from "./components/Hero";
import Posts from "./components/Posts";
import Projects from "@scenes/HomeProjects";

type props = {
  animation: {
    xy: SpringValue<number[]>;
  };
};

const HomePage = ({ animation }: props) => {
  return (
    <div className={styles.container}>
      <Hero />
      <div className="pageWrapper">
        <WhatWeDo />
      </div>
      <Works />
      <div className="pageWrapper">
        <Projects title="Projects" navigation={true} />
      </div>
      <Testimonials />
      {/* <Gallery /> */}
      <div className="pageWrapper">
        <Posts />
      </div>
      {/* <MailUs /> */}
    </div>
  );
};

export default HomePage;
