import { useStaticQuery, graphql } from 'gatsby';

const useBackgroundsAssets = () => {
  const data = useStaticQuery(graphql`
    query {
      starsBig: file(relativePath: { eq: "backgrounds/stars-big.svg" }) {
        publicURL
      }
      starsSmall: file(relativePath: { eq: "backgrounds/stars-small.svg" }) {
        publicURL
      }

      folderPc: file(relativePath: { eq: "backgrounds/folder/folder_pc.svg" }) {
        publicURL
      }
      folderTablet: file(relativePath: { eq: "backgrounds/folder/folder_tablet.svg" }) {
        publicURL
      }
      folderMobile: file(relativePath: { eq: "backgrounds/folder/folder_mobile.svg" }) {
        publicURL
      }

      workPc: file(relativePath: { eq: "backgrounds/works/work_pc.svg" }) {
        publicURL
      }
      workTablet: file(relativePath: { eq: "backgrounds/works/work_tablet.svg" }) {
        publicURL
      }
      workMobile: file(relativePath: { eq: "backgrounds/works/work_mobile.svg" }) {
        publicURL
      }

      reviewPc: file(relativePath: { eq: "backgrounds/reviews/review_pc.svg" }) {
        publicURL
      }
      reviewTablet: file(relativePath: { eq: "backgrounds/reviews/review_tablet.svg" }) {
        publicURL
      }
      reviewMobile: file(relativePath: { eq: "backgrounds/reviews/review_mobile.svg" }) {
        publicURL
      }
      
    }
  `);

  return data;
};

export default useBackgroundsAssets;
