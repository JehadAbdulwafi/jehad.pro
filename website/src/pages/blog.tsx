import React from "react";

import Providers from "@components/Providers";
import Layout from "@components/Layout";
import BlogPage from "@scenes/BlogPage";
import HeadPage from "@components/Head";
import { HeadFC } from "gatsby";

function Blog({ pageContext }: any) {
  const { page } = pageContext;
  return (
    <Providers>
      <Layout>
        <BlogPage page={page} />
      </Layout>
    </Providers>
  );
}
export const Head: HeadFC = () => {
  const title = "Blog | Jehad.Pro";
  const description = `If you would like to find some useful articles about digital products - welcome to our blog page. Here we tell you about design and development, we share our case studies with you, and we talk about logos and branding.`;

  return <HeadPage title={title} description={description}></HeadPage>;
};
export default Blog;
