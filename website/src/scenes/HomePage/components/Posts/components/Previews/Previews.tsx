import React from "react";
import { Link } from "gatsby";

import Item from "./components/Item";
import SlideHover from "@components/SlideHover";
// import { useWordpressPosts } from "@hooks/queries";
// @ts-ignore
import * as styles from "./Previews.module.scss";
import { useBlogAssets } from "@hooks/queries";

const Previews = () => {
  const { preview1, preview2, preview3 } = useBlogAssets();
  const items = [
    {
      path: "/ma-ho-tsmym-almntg-oaamly-tsmym-almntg-bshkl-aaam",
      title:
        "What is the product design and the product design process in general?",
      preview: preview1,
      tag: "design",
    },
    {
      path: "/ttbyk-alsfh-aloahd-spa-mkabl-ttbyk-alsfhat-almtaadd-mpa-matha-tkhtar",
      title:
        "The one page (SPA) for the multi-page application (MPA): What do you choose?",
      preview: preview2,
      tag: "frontend",
    },
    {
      path: "/7-nsayh-lthsyn-mhrkat-albhth-ltaazyz-tsnyfat-mokaa-aloyb-algdyd-alkhas-bk",
      title: "7 SEO Tips to Boost Your New Website's Rankings",
      preview: preview3,
      tag: "SEO",
    },
  ];

  return (
    <div>
      <div>
        {items.map((item) => {
          return <Item key={item.path} {...item} />;
        })}
      </div>
      <SlideHover>
        <Link to="/blog" className={styles.link}>
          MORE BLOG POSTS
        </Link>
      </SlideHover>
    </div>
  );
};

export default Previews;
