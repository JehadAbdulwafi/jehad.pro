import { useStaticQuery, graphql } from 'gatsby';


const useHomeHeroAssets = () => {
  const data = useStaticQuery(graphql`
    query {
      clutchBackground: file(
        relativePath: { eq: "sections/home-hero/clutch-background.png" }
      ) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
      dribbbleBackground: file(
        relativePath: { eq: "sections/home-hero/dribbble-background.png" }
      ) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
      upworkBackground: file(
        relativePath: { eq: "sections/home-hero/upwork-background.png" }
      ) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
      clutchLogotype: file(relativePath: { eq: "brands/clutch.svg" }) {
        publicURL
      }
      dribbbleLogotype: file(relativePath: { eq: "brands/dribbble.svg" }) {
        publicURL
      }
      upworkLogotype: file(relativePath: { eq: "brands/upwork.svg" }) {
        publicURL
      }
      clutchLaurel: file(
        relativePath: { eq: "sections/home-hero/clutch-icon.svg" }
      ) {
        publicURL
      }
      dribbbleLaurel: file(
        relativePath: { eq: "sections/home-hero/dribbble-icon.svg" }
      ) {
        publicURL
      }
      upworkLaurel: file(
        relativePath: { eq: "sections/home-hero/upwork-icon.svg" }
      ) {
        publicURL
      }
      quotes: file(relativePath: { eq: "ui/quotes.svg" }) {
        publicURL
      }
      hero_01: file(
        relativePath: { eq: "sections/home-hero/gold/home-hero_01.webp" }
      ) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
      hero_02: file(
        relativePath: { eq: "sections/home-hero/gold/home-hero_02.webp" }
      ) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
      hero_03: file(
        relativePath: { eq: "sections/home-hero/gold/home-hero_03.webp" }
      ) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
      hero_04: file(
        relativePath: { eq: "sections/home-hero/gold/home-hero_04.webp" }
      ) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
      hero_05: file(
        relativePath: { eq: "sections/home-hero/gold/home-hero_05.webp" }
      ) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
      video:  file(
        relativePath: { eq: "videos/Mirror.mp4" }
      ) {
        publicURL
      }
    }
  `);

  return data;
};

export default useHomeHeroAssets;
