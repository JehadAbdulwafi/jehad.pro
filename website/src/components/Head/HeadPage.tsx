import React from "react";

import { useSiteMetadata } from "../../hooks/queries";

type HeadProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
};

const Head = ({
  children,
  title = "Web Design and Development Services | Jehad.Pro",
  description = "Jehad.Pro Team brings the design-driven development of your digital product to reality. We are working with a variety of projects, from the strict insurance website to a dynamic music application.",
}: HeadProps) => {
  const metadata = useSiteMetadata();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://jehad.pro/#organization",
        name: "Jehad.Pro",
        url: "https://jehad.pro/",
        sameAs: [
          "https://www.facebook.com/jehadabdulwafi/",
          "https://www.instagram.com/jehadabdulwafi/",
        ],
        logo: {
          "@type": "ImageObject",
          "@id": "https://jehad.pro/#logo",
          url: "https://jehad.pro/tile-512.png",
          width: 120,
          height: 60,
          caption: "Jehad.Pro",
        },
        image: { "@id": "https://jehad.pro/#logo" },
      },
      {
        "@type": "WebSite",
        "@id": "https://jehad.pro/#website",
        url: "https://jehad.pro/",
        name: "Jehad.Pro",
        publisher: { "@id": "https://jehad.pro/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://jehad.pro/?s={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://jehad.pro/#webpage",
        url: "https://jehad.pro/",
        inLanguage: "en-US",
        name: "Home &mdash; Jehad.Pro",
        isPartOf: { "@id": "https://jehad.pro/#website" },
        about: { "@id": "https://jehad.pro/#organization" },
        datePublished: "2019-02-27T12:02:41+00:00",
        dateModified: "2019-04-10T07:31:56+00:00",
      },
    ],
  };

  return (
    <>
      <html lang="en" />
      <meta charSet="utf-8" />
      <meta
        content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        name="viewport"
      />

      <meta
        content="ui/ux agency, design agency, ux agency, design and development, design and development agency, design studio, design and development studio, design company, design and development company, design consultant, ui ux agency, ux ui design agency, ui design company, ux design consultancy, ui company, ux design company, ui ux design firm, ui design agency, user interface design company, ui ux company, ui ux design agency, ui design firm, ui studio, best design studios, best design and development studios, top development agencies, reactjs development, gatsbyjs development, websites, web development, front-end development"
        name="keywords"
      />
      <meta content={metadata.title} name="author" />

      <title>{title} </title>
      <meta content={description} name="description" />

      {/* <!-- Twitter meta --> */}
      <meta content="summary" name="twitter:card" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta
        content="https://jehad.pro/tile-256.png"
        name="twitter:image"
      />
      <meta content={metadata.siteUrl} name="twitter:url" />

      {/* <!-- Facebook meta --> */}
      <meta content={metadata.siteUrl} property="og:site_name" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content="website" property="og:type" />
      <meta
        content="https://jehad.pro/tile-512.png"
        property="og:image"
      />
      <meta content={metadata.siteUrl} property="og:url" />
      <meta property="og:locale" content="en_US" />

      {/* <!-- Verification google search console --> */}
      {/* <meta
        content={process.env.GATSBY_GOOGLE_SEARCH_CONSOLE_VERIFICATION_ID}
        name="google-site-verification"
      /> */}
      {/* <!-- Verification pinterest --> */}
      {/* <meta
        name="p:domain_verify"
        content={process.env.GATSBY_PINTEREST_VERIFICATION_ID}
      /> */}

      {/* Micro data */}
      <script type="application/ld+json"> {JSON.stringify(schema)} </script>

      {/* <link rel="stylesheet" href="https://use.typekit.net/yka6loi.css" /> */}

      {/* Additional tags */}
      {children}
    </>
  );
};

export default Head;
