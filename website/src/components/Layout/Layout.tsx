import React, { useRef, useEffect, useState, useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { MenuContext, HeaderGradientContext } from "../../contexts";

import Header from "../Header";
// import Footer from "@components/Footer";

import * as styles from "./Layout.module.scss";
import "../../styles/index.scss";
import Footer from "@components/Footer";
import { useSiteMetadata } from "@hooks/queries";
import { HeadFC } from "gatsby";

let oldScrollPosition = 0;

type LayoutProps = {
  children: React.ReactNode;
  isGlow?: boolean;
  headerIsWhite?: boolean;
  footerIsHide?: boolean;
};

const Layout = ({
  children,
  isGlow = true,
  headerIsWhite = false,
  footerIsHide = false,
}: LayoutProps) => {
  const { isOpened } = useContext(MenuContext);
  const headerRef = useRef(null);
  let scrollPosition = null;

  const [isHeaderGradient, setIsHeaderWithoutGradient] = useState(false);
  const [isHeaderShow, setIsHeaderShow] = useState(true);

  const mainClasses = classNames(styles.main, styles.hidden);
  const footerClasses = classNames(styles.footer, styles.hidden);

  const footer = !footerIsHide && (
    <footer className={footerClasses}>
      <Footer />
    </footer>
  );

  const handleScroll = () => {
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPosition - oldScrollPosition > 0) {
      setIsHeaderShow(false);
    } else {
      setIsHeaderShow(true);
    }
    oldScrollPosition = scrollPosition;
  };

  useEffect(() => {
    setIsHeaderShow(true);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HeaderGradientContext.Provider value={{ setIsHeaderWithoutGradient }}>
      <>
        <div
          className={classNames(styles.container, { [styles.glow]: isGlow })}
        >
          <header className={styles.header}>
            <Header
              headerIsWhite={headerIsWhite}
              withoutGradient={false}
              headerShow={isOpened ? true : isHeaderShow}
              forwardedRef={headerRef}
            />
          </header>
          <main className={mainClasses}>{children}</main>

          {footer}
        </div>
      </>
    </HeaderGradientContext.Provider>
  );
};

export const Head: HeadFC = () => {
  const metadata = useSiteMetadata();
  const title = "Web Design and Development Services | JS Station";
  const description = `JS Station Team brings the design-driven development of your digital product to reality. We are working with a variety of projects, from the strict insurance website to a dynamic music application.`;

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
      <script type="application/ld+json">
        {`{
              "@context": "schema.org",
              "@type":"Organization",
              "name":"site",
              "url":"https://jehad.pro/",
              "logo":"https://jehad.pro/logo.svg",
              "contactPoint":
              [
                {
                  "@type": "ContactPoint",
                  "telephone": "+380632362920",
                  "contactType": "",
                  "areaServed": ""
                }
              ],
              "sameAs":
              ["https://www.facebook.com/jehadabdulwafi/", "https://www.instagram.com/jehadabdulwafi/", "https://twitter.com/jehadabdulwafi"]
            }`}
      </script>
    </>
  );
};

export default Layout;
