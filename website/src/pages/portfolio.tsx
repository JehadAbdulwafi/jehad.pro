import React from 'react';
import { HeadFC } from "gatsby";
import Providers from '@components/Providers';
import Layout from '@components/Layout';
import PortfolioPage from '@scenes/PortfolioPage';
import HeadPage from '@components/Head';

const Portfolio = () => {

  return (
    <Providers>
      <Layout>
        <PortfolioPage />
      </Layout>
    </Providers>
  );
};
export const Head: HeadFC = () => {
  const title = "Web Design and Development Services | Jehad.Pro";
  const description = `Jehad.Pro Team brings the design-driven development of your digital product to reality. We are working with a variety of projects, from the strict insurance website to a dynamic music application.`;

  return <HeadPage title={title} description={description}></HeadPage>;
};



export default Portfolio;
