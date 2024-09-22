import React from "react";
import { HeadFC } from "gatsby";
import Providers from "@components/Providers";
import Layout from "@components/Layout";
import ServicesPage from "@scenes/ServicesPage";
import HeadPage from "@components/Head";

const Services = () => {
  return (
    <Providers>
      <Layout>
        <ServicesPage />
      </Layout>
    </Providers>
  );
};

export const Head: HeadFC = () => {
  const title = "Services | Web Design and Development Services | Jehad.Pro";
  const description = `We offer to get acquainted with tools that we use in our studio to create the wonders of the digital world.`;

  return <HeadPage title={title} description={description}></HeadPage>;
};

export default Services;
