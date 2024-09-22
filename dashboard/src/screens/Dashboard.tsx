import { Button } from "@components/ui/button";
import axiosClient from "../../axios-client";
import { useEffect, useState } from "react";
import Switcher from "@components/Switcher";
import ScrollSec from "@components/ScrollSec";

const getBlogs = async (signal: AbortSignal) => {
  try {
    const response = await axiosClient.get("/posts", { signal });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getImages = async (signal: AbortSignal) => {
  try {
    const response = await axiosClient.get("/images", { signal });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getMessages = async (signal: AbortSignal) => {
  try {
    const response = await axiosClient.get("/messages", { signal });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      const bolgsPromise = getBlogs(signal);
      const imagesPromise = getImages(signal);
      const messagesPromise = getMessages(signal);
      try {
        const [b, i, m] = await Promise.all([
          bolgsPromise,
          imagesPromise,
          messagesPromise,
        ]);
        setBlogs(b);
        setImages(i);
        setMessages(m);
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
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download</Button>
        </div>
      </div>
      <Switcher messages={messages} />

      <ScrollSec
        title="Blog Posts"
        subTitle="design, development and seo blogs"
        ThumbnailClass="w-[250px]"
        data={blogs}
        width={250}
        height={250}
        type="blog"
        buttonLabel="add new"
        buttonLink="/blogs/new"
      />
      <ScrollSec
        title="Images"
        subTitle="design, development and seo blogs"
        ThumbnailClass="w-[250px]"
        data={images}
        width={250}
        height={250}
        type="image"
        buttonLabel="add new"
        buttonLink="/images/new"
      />
    </div>
  );
};

export default Dashboard;
