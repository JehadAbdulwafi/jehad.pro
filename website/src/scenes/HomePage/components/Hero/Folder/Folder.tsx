import React, { SVGProps, useEffect } from "react";
import classNames from "classnames";
//@ts-ignore
import * as styles from "./Folder.module.scss";
import { useHomeHeroAssets } from "@hooks/queries";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
const words = [
  {
    text: "smart", // buzel
    color: "#FF0000",
    char: ["s", "m", "a", "r", "t"],
  },
  {
    text: "big", // hourse
    color: "#00FFFF",
    char: ["b", "i", "g"],
  },
  {
    text: "tech", // hourse
    color: "#00FFFF",
    char: ["t", "e", "c", "h"],
  },
  {
    text: "buzz", // fire
    color: "#FFFF00",
    char: ["b", "u", "z", "z"],
  },

  {
    text: "COOL", // hand
    color: "#00FF00",
    char: ["c", "o", "o", "l"],
  },
];

const Folder = () => {
  const { hero_01, hero_02, hero_03, hero_04, hero_05 } = useHomeHeroAssets();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isDone, setIsDone] = React.useState(false);

  const IMAGES = [hero_01, hero_02, hero_03, hero_04, hero_05];
  useEffect(() => {
    const intervalA = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    const intervalB = setInterval(() => {
      setIsDone((prev) => !prev);
    }, 1000);

    return () => {
      clearInterval(intervalA);
      clearInterval(intervalB);
    };
  }, []);

  useEffect(() => {
    // Reset animation on component render
    const elements = document.getElementsByClassName(styles.char);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(styles.active);
      elements[i].classList.remove(styles.done);
      void elements[i].offsetWidth; // Trigger reflow to restart the animation
      elements[i].classList.add(styles.active);
    }
  }, [activeIndex]);

  return (
    <div className={styles.folderContainer}>
      <div className={styles.folderWrapper}>
        <div className={styles.folder}>
          <h1>
            LET'S BUILD THE NEXT
            <br />
            <div className={styles.wordsWrapper}>
              <span className={styles.words}>
                {words.map((word, i) => {
                  const isWordActive = i === activeIndex;
                  const isWordDone = isWordActive && isDone;
                  const wordStyles = classNames(styles.word, {
                    [styles.wordActive]: isWordActive,
                    [styles.wordDone]: isWordDone,
                  });
                  const charStyles = classNames(styles.char, {
                    [styles.active]: isWordActive,
                    [styles.done]: isWordDone,
                  });
                  return (
                    <strong key={i} className={wordStyles}>
                      {word.char.map((char, i) => {
                        return (
                          <span key={char + i} className={charStyles}>
                            {char}
                          </span>
                        );
                      })}
                    </strong>
                  );
                })}
                &nbsp;
              </span>
              <span className={styles.thing}>THING</span>
            </div>
          </h1>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              {IMAGES.map((img, i) => {
                const isImageActive = i === activeIndex;
                const isImageDone = isImageActive && isDone;
                const imageStyles = classNames(styles.img, {
                  [styles.imgActive]: isImageActive,
                  [styles.imgDone]: isImageDone,
                });
                return (
                  <GatsbyImage
                    key={i}
                    className={imageStyles}
                    image={img.childImageSharp.gatsbyImageData}
                    alt="hero"
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.line} />
          <div className={styles.folderFooter}>
            <div className={styles.folderFooterWrapper}>
              <div className={styles.text}>
                <h1>10Y</h1>
                <span>
                  OF DESIGN-DRIVEN <br /> PRODUCT DEVELOPMENT
                </span>
              </div>
              <Link to="/contacts" className={styles.button}>
                <LightingIcon
                  className={classNames(styles.lightingLeft, styles.lighting)}
                />
                <span>Let's talk</span>
                <LightingIcon
                  className={classNames(styles.lightingRight, styles.lighting)}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LightingIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        // fill="#000000"
        d="M215.79 118.17a8 8 0 0 0-5-5.66L153.18 90.9l14.66-73.33a8 8 0 0 0-13.69-7l-112 120a8 8 0 0 0 3 13l57.63 21.61l-14.62 73.25a8 8 0 0 0 13.69 7l112-120a8 8 0 0 0 1.94-7.26ZM109.37 214l10.47-52.38a8 8 0 0 0-5-9.06L62 132.71l84.62-90.66l-10.46 52.38a8 8 0 0 0 5 9.06l52.8 19.8Z"
      ></path>
    </svg>
  );
};

export default Folder;
