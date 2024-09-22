import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import { Blog } from "@types/Blog";
import { Thumbnail } from "@components/thumbnail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Button } from "@components/ui/button";

const getBlogs = async (signal: AbortSignal) => {
  try {
    const response = await axiosClient.get("/posts", { signal });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[] | []>([]);
  const itemsDevelopment: Blog[] = [];
  const itemsDesign: Blog[] = [];
  const itemsInsights: Blog[] = [];
  const itemsSEO: Blog[] = [];

  blogs.forEach((item) => {
    if (item.category === "development") {
      itemsDevelopment.push(item);
    }

    if (item.category === "design") {
      itemsDesign.push(item);
    }

    if (item.category === "insights") {
      itemsInsights.push(item);
    }
    if (item.category === "SEO") {
      itemsSEO.push(item);
    }
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      const bolgsPromise = getBlogs(signal);
      try {
        const [blogs] = await Promise.all([bolgsPromise]);
        setBlogs(blogs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);



  return (
    <div className="flex-1 space-y-4 mt-1">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Link to={"/blogs/new"}>add new</Link>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Blogs</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {blogs &&
              blogs.map((blog) => (
                <li className="w-full" key={blog.slug}>
                  <Thumbnail
                    key={blog.slug}
                    item={blog}
                    className={"ThumbnailClass"}
                    aspectRatio="square"
                    width={320}
                    height={300}
                    type={"blog"}
                  />
                </li>
              ))}
          </ul>
        </TabsContent>
        <TabsContent value="development">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {itemsDevelopment &&
              itemsDevelopment.map((blog) => (
                <li className="w-full" key={blog.slug}>
                  <Thumbnail
                    key={blog.slug}
                    item={blog}
                    className={"ThumbnailClass"}
                    aspectRatio="square"
                    width={320}
                    height={300}
                    type={"blog"}
                  />
                </li>
              ))}
          </ul>
        </TabsContent>
        <TabsContent value="design">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {itemsDesign &&
              itemsDesign.map((blog) => (
                <li className="w-full" key={blog.slug}>
                  <Thumbnail
                    key={blog.slug}
                    item={blog}
                    className={"ThumbnailClass"}
                    aspectRatio="square"
                    width={320}
                    height={300}
                    type={"blog"}
                  />
                </li>
              ))}
          </ul>
        </TabsContent>
        <TabsContent value="insights">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {itemsInsights &&
              itemsInsights.map((blog) => (
                <li className="w-full" key={blog.slug}>
                  <Thumbnail
                    key={blog.slug}
                    item={blog}
                    className={"ThumbnailClass"}
                    aspectRatio="square"
                    width={320}
                    height={300}
                    type={"blog"}
                  />
                </li>
              ))}
          </ul>
        </TabsContent>
        <TabsContent value="seo">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {itemsSEO &&
              itemsSEO.map((blog) => (
                <li className="w-full" key={blog.slug}>
                  <Thumbnail
                    key={blog.slug}
                    item={blog}
                    className={"ThumbnailClass"}
                    aspectRatio="square"
                    width={320}
                    height={300}
                    type={"blog"}
                  />
                </li>
              ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Blogs;
