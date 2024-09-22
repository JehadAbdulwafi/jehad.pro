import { useStaticQuery, graphql } from 'gatsby';

export const projectsPreview = graphql`
  fragment projectsPreview on File {
    childImageSharp {
      gatsbyImageData(layout: CONSTRAINED)
    }
  }
`;

export const projectsAvatar = graphql`
  fragment projectsAvatar on File {
    childImageSharp {
      gatsbyImageData(layout: CONSTRAINED)
    }
  }
`;

const useBlogAssets = () => {
  const data = useStaticQuery(graphql`
    query {
      preview1: file(
        relativePath: { eq: "sections/home-blog/how-design.webp" }
      ) {
        name
        ...projectsPreview
      }
      preview2: file(
        relativePath: { eq: "sections/home-blog/spa-mpa.webp" }
      ) {
        name
        ...projectsPreview
      }
      preview3: file(
        relativePath: { eq: "sections/home-blog/seo.webp" }
      ) {
        name
        ...projectsPreview
      }
    }
  `);

  return data;
};

export default useBlogAssets;
