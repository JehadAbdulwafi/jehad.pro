import React, { useRef } from "react";
// @ts-ignore
import * as styles from "./Slider.module.scss";
import Item from "./components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

import { Navigation } from "swiper/modules";
import { useProjectsAssets } from "@hooks/queries";

SwiperCore.use([Navigation]);
const Slider = () => {
  const {
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
  } = useProjectsAssets();
  const swiperRef = useRef(null);
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
  const sliderParams = {
    spaceBetween: 16,
    slidesPerView: "auto",
    centeredSlides: true,

    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        loop: true,
        spaceBetween: 40,
        centeredSlides: false,
      },
      1280: {
        centeredSlides: false,
        loop: true,
        spaceBetween: 30,
      },
    },
  };

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const testimonialItems = items.map((item, index) => {
    return (
      <SwiperSlide key={index}>
        <Item
          key={item.id}
          // generalLogo={clutchLogo}
          // stars={stars}
          {...item}
        />
      </SwiperSlide>
    );
  });
  return (
    <div className={styles.testimonialSlider}>
        <Swiper
          modules={[Navigation]}
          {...sliderParams}
          // navigation
          grabCursor
          ref={swiperRef}
          // containerсlass={styles.testimonialSliderContainer}
        >
          {testimonialItems}
        </Swiper>
    </div>
  );
};

export default Slider;
