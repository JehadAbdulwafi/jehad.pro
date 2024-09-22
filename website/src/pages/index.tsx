import React from "react";

import { HeadFC } from "gatsby";
import Layout from "../components/Layout";
import Providers from "../components/Providers";
import { useSpring } from "react-spring";
import HomePage from "../scenes/HomePage";
import HeadPage from "@components/Head";
const calc = (x: number, y: number) => [
  x - window.innerWidth / 2,
  y - window.innerHeight / 2,
];

const Home = () => {
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  return (
    <Providers>
      <div
        onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
      >
        <Layout>
          <HomePage animation={props} />
        </Layout>
      </div>
    </Providers>
  );
};

export const Head: HeadFC = () => {
  const title = "Web Design and Development Services | Jehad.Pro";
  const description = `Jehad.Pro Team brings the design-driven development of your digital product to reality. We are working with a variety of projects, from the strict insurance website to a dynamic music application.`;

  return <HeadPage title={title} description={description}></HeadPage>;
};

export default Home;
