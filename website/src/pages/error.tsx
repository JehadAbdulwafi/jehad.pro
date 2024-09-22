import React from "react";
import { HeadFC } from "gatsby";
import Providers from "@components/Providers";
import Layout from "@components/Layout";
import ErrorPage from "@scenes/ErrorPage";
import HeadPage from "@components/Head";

const Error = () => {
  return (
    <Providers>
      <Layout>
        <ErrorPage />
      </Layout>
    </Providers>
  );
};

export const Head: HeadFC = () => {
  const title = "Error | Jehad.Pro";
  const description = `Jehad.Pro Team brings the design-driven development of your digital product to reality. We are working with a variety of projects, from the strict insurance website to a dynamic music application.`;

  return <HeadPage title={title} description={description}></HeadPage>;
};
export default Error;
