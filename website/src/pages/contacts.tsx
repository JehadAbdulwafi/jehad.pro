import React from "react";
import { HeadFC } from "gatsby";
import Providers from "@components/Providers";
import Layout from "@components/Layout";
import ContactsPage from "@scenes/ContactsPage";
import HeadPage from "@components/Head";

const Contacts = () => {
  return (
    <Providers>
      <Layout>
        <ContactsPage />
      </Layout>
    </Providers>
  );
};

export const Head: HeadFC = () => {
  const title = "Web Design and Development Services | Jehad.Pro";
  const description = `Jehad.Pro Team brings the design-driven development of your digital product to reality. We are working with a variety of projects, from the strict insurance website to a dynamic music application.`;

  return <HeadPage title={title} description={description}></HeadPage>;
};

export default Contacts;
