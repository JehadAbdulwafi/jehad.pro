import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import Providers from "@components/Providers";
import Layout from "@components/Layout";
import Description from "./components/Description";
import Headline from "./components/Headline";
import { HeadFC } from "gatsby";
// @ts-ignore
import * as styles from "./Project.module.scss";
import HeadPage from "@components/Head";
import useHeaderIsWhite from "@hooks/useHeaderIsWhite";
import { Project } from "@types/Project";

type Props = {
  pageContext: {
    data: Project;
    next: Project;
  };
};

const ProjectPage = ({ pageContext }: Props) => {
  const { data, next } = pageContext;

  const contentRef = React.useRef(null);
  const nextLink = `/portfolio/${next.slug}`;

  return (
    <Providers>
      <Layout footerIsHide={true}>
        <Headline data={data} />

        <div ref={contentRef}>
          <Description data={data} />
        </div>

        <Link to={nextLink} className={styles.headlineWrapLink}>
          <Headline data={next} truncated />
        </Link>
      </Layout>
    </Providers>
  );
};

export default ProjectPage;

export const Head: HeadFC = ({ pageContext }) => {
  const { data }: pageContext = pageContext;
  const title = `${data.title} - Web Design and Development Services | Jehad.Pro`;
  const description = data.excerpt;

  return (
    <HeadPage title={title} description={description}>
      <script type="application/ld+json">
        {`{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Jehad.Pro",
          "item": "https://www.jehad.pro/"
        }, {
          "@type": "ListItem",
          "position": 2,
          "name": "${data.title}",
          "item": "https://www.jehad.pro/blog/${data.slug}"
        }, {
          "@type": "ListItem",
          "position": 3,
          "name": "{h1}"
        }]
      },
      {
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://google.com/article"
        },
        "headline": "${data.title}",
        "datePublished": "${data.date}",
        "dateModified": "${data.date}",
        "author": {
          "@type": "Organization",
          "name": "Jehad.Pro"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Jehad.Pro",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.jehad.pro/tile-512.png"
          }
        }
      }
    ]
  }`}
      </script>
    </HeadPage>
  );
};
