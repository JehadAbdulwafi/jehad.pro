import React, { useEffect, useState } from "react";
import classNames from "classnames";

import Previews from "./components/Previews";
import GradientText from "../../components/GradientText";

// @ts-ignore
import * as styles from "./BlogPage.module.scss";
import axiosClient from "../../../axiosClient";

type Props = {
  page: number;
};

const BlogPage = ({ page }: Props) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const response = await axiosClient.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const pageWrapperClass = classNames(styles.container, "pageWrapper");
  return (
    <div className={pageWrapperClass}>
      <h1 className={styles.title}>
        <GradientText text="المدونة" />
      </h1>
      <Previews items={posts} page={page} />
    </div>
  );
};

export default BlogPage;
