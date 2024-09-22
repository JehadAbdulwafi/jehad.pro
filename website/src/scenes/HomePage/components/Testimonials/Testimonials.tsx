import React, { useState, useEffect, useRef } from "react";

import Item from "./components/Item";
import { useTestimonialsAssets } from "../../../../hooks/queries";
import classnames from "classnames";
// @ts-ignore
import * as s from "./Testimonials.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";

SwiperCore.use([Navigation]);
const Testimonials = () => {
  const {
    clutchLogo,
    companyLogo1,
    companyLogo2,
    companyLogo3,
    companyLogo4,
    companyLogo5,
    stars,
  } = useTestimonialsAssets();

  const items = [
    {
      author: `Alexander Kozma Ingal, Room Six`,
      companyLogo: companyLogo1,
      rating: "4.8",
      text: `They perfectly met my expectations — working with them felt like an extension of my in-house team.`,
    },
    {
      author: `Marshall Haas, CEO & Co-Founder, Need/Want`,
      companyLogo: companyLogo2,
      rating: "5.0",
      text: `The value we get from them and their quality work set them apart from others.`,
    },
    {
      author: `Bogdan Suchyk, Founder, Mobalytics`,
      companyLogo: companyLogo3,
      rating: "5.0",
      text: `I was most appreciative of their ability to provide us with designers for specific needs.`,
    },
    {
      author: `Anton Glance, Founder, Glance Tech Inc.`,
      companyLogo: companyLogo4,
      rating: "5.0",
      text: `JS Station was transparent about deliverables and any challenges the team was facing.`,
    },
    {
      author: `Panos Rigopoulos, Co-founder, Software Company`,
      companyLogo: companyLogo5,
      rating: "5.0",
      text: `JS Station works hard to produce good results at a reasonable price.`,
    },
  ];
  const swiperRef = useRef(null);

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
          key={item.author}
          generalLogo={clutchLogo}
          stars={stars}
          {...item}
        />
      </SwiperSlide>
    );
  });

  return (
    <div className="section">
      <div className={s.testimonial}>
        <div className={s.testimonialWrapper}>
          <div className={s.testimonialInfo}>
            <h1
              className={classnames(
                "section-title section-title--inner section-title--center-mobile",
                s.title
              )}
            >
              What others are saying about Scenery
            </h1>
            <div className={s.testimonialNavigation}>
              <button
                type="button"
                id="goPrev"
                title="navigate to prev"
                onClick={goPrev}
                className={classnames(
                  s.testimonialNavigationButton
                  // "swiper-button-prev"
                )}
              >
                <SecondArrowIcon mod="icon--navigate" />
              </button>
              <button
                type="button"
                id="goNext"
                title="navigate to next"
              onClick={goNext}
                  className={classnames(
                  s.testimonialNavigationButton,
                  s.testimonialNavigationButtonNext
                  // "swiper-button-next"
                )}
              >
                <SecondArrowIcon mod="icon--navigate" />
              </button>
            </div>
          </div>
          <div className={s.testimonialSlider}>
            <div>
              <Swiper
                modules={[Navigation]}
                {...sliderParams}
                // navigation
                grabCursor
                ref={swiperRef}
                containerсlass={s.testimonialSliderContainer}
              >
                {testimonialItems}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecondArrowIcon = ({ mod }) => {
  return (
    <div className={classnames("icon", { [mod]: mod })}>
      <div></div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 6.00012L8 10.0001L4 6.00012"
          stroke="#21334F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Testimonials;
