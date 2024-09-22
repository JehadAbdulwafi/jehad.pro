import React, { useMemo } from "react";
import classNames from "classnames";
import { HeadFC } from "gatsby";
import Providers from "@components/Providers";
import Layout from "@components/Layout";
import Article from "./components/Article";
import Headline from "./components/Headline";
import Thumbnails from "./components/Thumbnails";
// @ts-ignore
import * as styles from "./BlogPost.module.scss";
import { Post } from "@types/Post";
import HeadPage from "@components/Head";

type pageContext = {
  pageContext: {
    data: Post;
    allPosts: Post[];
  };
};

function getRecommendedPosts(allPosts: Post[] = [], currentPost: Post) {
  const RECOMMENDED_POSTS_LIMIT = 3;
  const recommendedPosts: Post[] | [] = [];

  while (
    recommendedPosts.length < RECOMMENDED_POSTS_LIMIT &&
    allPosts.length > RECOMMENDED_POSTS_LIMIT
  ) {
    const random = Math.floor(Math.random() * allPosts.length);

    if (
      !recommendedPosts.includes(allPosts[random]) &&
      allPosts[random].id !== currentPost.id
    ) {
      recommendedPosts.push(allPosts[random]);
    }
  }

  return recommendedPosts;
}

const BlogPost = ({ pageContext }: pageContext) => {
  const { data, allPosts } = pageContext;
  console.log(allPosts);
  const recommendedPosts = useMemo(
    () => getRecommendedPosts(allPosts, data),
    [allPosts, data]
  );

  const pageWrapperClass = classNames(styles.container);

  return (
    <Providers>
      <Layout isGlow headerIsWhite>
        <div className={pageWrapperClass}>
          <Headline
            image={data.image}
            title={data.title}
            created_at={data.created_at}
            category={"web development"}
          />
        </div>
        <div>
          <Article
            content={data.content}
            name={data.name}
            desc={data.desc}
            jobTitle={data.jobTitle}
            readTime={data.readTime}
          />
        </div>
        {recommendedPosts.length > 0 && (
          <div className="oldPageWrapper">
            <Thumbnails items={recommendedPosts} />
          </div>
        )}
        {/* <MailUs /> */}
      </Layout>
    </Providers>
  );
};

export default BlogPost;

export const Head: HeadFC = ({ pageContext }) => {
  const { data }: { data: Post } = pageContext;
  const title = `${data.title} - Web Design and Development Services | Jehad.Pro`;
  const description = data.desc;

  return (
    <HeadPage title={title} description={description}>
      <script type="application/ld+json">
        {`{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Jehad.Pro",
          "item": "https://www.jehad.pro/"
        }, {
          "@type": "ListItem",
          "position": 2,
          "name": "${data.title}",
          "item": "https://www.jehad.pro/blog/${data.slug}"
        }, {
          "@type": "ListItem",
          "position": 3,
          "name": "{h1}"
        }]
      },
      {
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://google.com/article"
        },
        "headline": "${data.title}",
        "datePublished": "${data.created_at}",
        "dateModified": "${data.updated_at}",
        "author": {
          "@type": "Organization",
          "name": "Jehad.Pro"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Jehad.Pro",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.jehad.pro/tile-512.png"
          }
        }
      }
    ]
  }`}
      </script>
    </HeadPage>
  );
};
