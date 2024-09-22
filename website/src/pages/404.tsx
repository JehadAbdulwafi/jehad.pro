import React from "react";
import { HeadFC } from "gatsby";
import Providers from "../components/Providers";
import NotFoundPage from "../scenes/NotFoundPage";
import HeadPage from "@components/Head";

const NotFound = () => {
  return (
    <Providers>
      <NotFoundPage />
    </Providers>
  );
};

export const Head: HeadFC = () => {
  const title = `404 Not found | Jehad.Pro`;
  const description = `Jehad.Pro Team brings the design-driven development of your digital product to reality. We are working with a variety of projects, from the strict insurance website to a dynamic music application.`;

  return <HeadPage title={title} description={description}></HeadPage>;
};

export default NotFound;
