const axios = require(`axios`);
const getAllPosts = async () => {
  const { data: places } = await axios.get(`https://api.jehad.pro/api/posts`);
  return places;
};
const projects = require("./projects");
exports.createPages = async ({ actions: { createPage } }) => {
  const allPosts = await getAllPosts();

  allPosts.forEach((node, index) => {
    createPage({
      path: `/blog/${node.slug}`,
      component: require.resolve(`./src/templates/BlogPost/BlogPost.tsx`),
      context: { data: node, allPosts },
    });
  });

  allPosts.forEach(({ node }) => {
    const itemsDevelopment = [];
    const itemsDesign = [];
    const itemsInsights = [];

    allPosts.forEach((item) => {
      if (item.category === "development") {
        itemsDevelopment.push(item);
      }

      if (item.category === "design") {
        itemsDesign.push(item);
      }

      if (item.category === "insights") {
        itemsInsights.push(item);
      }
    });

    const lengthOfArray = (i) => {
      if (i.length <= 9) {
        return 1;
      } else {
        return (i.length - 9) / 3 + 1;
      }
    };
    const developmentPages = Array.from(
      {
        length: Math.ceil(lengthOfArray(itemsDevelopment)),
      },
      (_, i) => i + 1
    );
    const designPages = Array.from(
      {
        length: Math.ceil(lengthOfArray(itemsDesign)),
      },
      (_, i) => i + 1
    );
    const insightsPages = Array.from(
      {
        length: Math.ceil(lengthOfArray(itemsInsights)),
      },
      (_, i) => i + 1
    );

    const categoriesPages = [
      { category: "development", item: developmentPages },
      { category: "design", item: designPages },
      { category: "insights", item: insightsPages },
    ];

    categoriesPages.forEach((category) => {
      category.item.forEach((page) => {
        let pageUrl = page === 1 ? "" : "/" + page;
        createPage({
          path: `/blog/${category.category}${pageUrl}`,
          component: require.resolve(`./src/pages/blog.tsx`),
          context: { page },
        });
      });
    });
  });

  projects.forEach((node, index) => {
    let next =
      index === projects.length - 1 ? projects[0] : projects[index + 1];

    createPage({
      path: `/portfolio/${node.slug}`,
      component: require.resolve(`./src/templates/Project/Project.tsx`),
      context: { data: node, next },
    });
  });
};
