import React, { Fragment } from "react";
import PropTypes from "prop-types";

import ProjectScene from "./components/ProjectScene";
// @ts-ignore
import * as styles from "./List.module.scss";
import Heading from "./components/Heading";
import Slider from "./components/Slider";

type props = {
  preview1: any;
  preview2: any;
  preview3: any;
  preview4: any;
  preview5: any;
  figma: any;
  gatsby: any;
  laravel: any;
  nextjs: any;
  nodejs: any;
  prismic: any;
  react: any;
  strapi: any;
  threejs: any;
  vue: any;
};

const List = ({
  preview1,
  preview2,
  preview3,
  preview4,
  preview5,
  figma,
  gatsby,
  laravel,
  nextjs,
  nodejs,
  prismic,
  react,
  strapi,
  threejs,
  vue,
}: props) => {
  const items = [
    {
      id: 0,
      link: "https://mightybuildings.com/",
      linkTitle: "View project",
      preview: preview1,
      tags: "Construction, Building, 3D Printing, CAD",
      title: "$40 Million Raised by Mighty Buildings in Series B Funding",
      alt: "Mighty Buildings — Modern 3D-printed Prefab Homes",
      imgTitle: "Mighty Buildings — Modern 3D-printed Prefab Homes",
      technologies: [
        { name: "Figma", icon: figma },
        { name: "VueJS", icon: vue },
        { name: "Laravel", icon: laravel },
      ],
    },
    {
      id: 1,
      link: "https://raven.gg/",
      linkTitle: "View project",
      preview: preview2,
      tags: "E-commerce, 3D Builder, Esports",
      title: "Co-creating Innovation for Esports Apparel Industry Leader",
      alt: "Raven. Custom Esports Gaming Jerseys. Design & Print",
      imgTitle: "Raven. Custom Esports Gaming Jerseys. Design & Print",
      technologies: [
        { name: "Figma", icon: figma },
        { name: "ReactJS", icon: react },
        { name: "ThreeJS", icon: threejs },
      ],
    },
    {
      id: 2,
      link: "https://secureprivacy.ai/",
      linkTitle: "View project",
      preview: preview3,
      tags: "Legal, Privacy, Data, Accounting",
      title: "Best Usability and Performance by G2 Scoring ",
      alt: "Data privacy and cookie consent compliance",
      imgTitle: "Data privacy and cookie consent compliance",
      technologies: [
        { name: "Figma", icon: figma },
        { name: "ReactJS", icon: react },
        { name: "GatsbyJS", icon: gatsby },
        { name: "PrismicCMS", icon: prismic },
      ],
    },
    {
      id: 3,
      link: "https://buecherregister.de/",
      linkTitle: "View project",
      preview: preview4,
      tags: "B2C, Content Management, SAAS",
      title: "Tailored B2C Portal for Europe Bibliophile Audience",
      alt: "Central online register for private libraries",
      imgTitle: "Central online register for private libraries",
      technologies: [
        { name: "Figma", icon: figma },
        { name: "ReactJS", icon: react },
        { name: "NextJS", icon: nextjs },
        { name: "StrapiCMS", icon: strapi },
      ],
    },
    {
      id: 4,
      link: "https://www.mypixhealth.com/",
      linkTitle: "View project",
      preview: preview5,
      tags: "Health Care, Telemedicine, Diagnostics",
      title: "From Zero to MVP for 3 Months of Design and Development",
      alt: "Urgent Care online Doctors Visits",
      imgTitle: "Urgent Care online Doctors Visits",
      technologies: [
        { name: "Figma", icon: figma },
        { name: "ReactJS", icon: react },
        { name: "NodeJS", icon: nodejs },
      ],
    },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.gradient}></div>
      <div className={styles.wrapper}>
        <Heading
          title="our Projects"
          subTitle="We are a full-service digital agency that builds immersive user experience. Our team creates an exceptional visualization and thought-out functionality"
        />
        <Slider />
      </div>
    </section>
  );
};

export default List;
