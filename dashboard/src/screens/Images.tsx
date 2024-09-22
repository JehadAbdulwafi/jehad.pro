import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { Thumbnail } from "@components/thumbnail";
import { Button } from "@components/ui/button";
import { Image } from "@types/Image";
import { Link } from "react-router-dom";

const getImages = async (signal: AbortSignal) => {
  try {
    const response = await axiosClient.get("/images", { signal });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

type Props = {};

const Images = (props: Props) => {
  const [Images, setImages] = useState<Image[] | []>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      const bolgsPromise = getImages(signal);
      try {
        const [Images] = await Promise.all([bolgsPromise]);
        setImages(Images);
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
        <h2 className="text-3xl font-bold tracking-tight">Images</h2>
        <div className="flex items-center space-x-2">
          <Link to={"/images/new"}>add new</Link>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {Images &&
          Images.map((image) => (
            <li className="w-full h-72">
              <Thumbnail
                key={image.id}
                item={image}
                className={"ThumbnailClass"}
                aspectRatio="square"
                width={320}
                height={300}
                type={"image"}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Images;
