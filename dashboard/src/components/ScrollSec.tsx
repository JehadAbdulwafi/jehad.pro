import React from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Thumbnail, listenNowAlbums, madeForYouAlbums } from "./thumbnail";
import { Blog } from "@types/Blog";
import { Image } from "@types/Image";
import { Message } from "@types/Message";
import { Project } from "@types/Project";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  subTitle?: string;
  data?: Blog[] | Image[] | Message[] | Project[];
  ThumbnailClass: string;
  width: number;
  height: number;
  type: "blog" | "project" | "message" | "image";
  buttonLabel?: string;
  buttonLink?: string;
};

const ScrollSec = ({
  title,
  subTitle,
  data,
  ThumbnailClass,
  width,
  height,
  type,
  buttonLabel,
  buttonLink,
}: Props) => {
  if (!data) return null;
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{subTitle}</p>
        </div>
        {buttonLink && buttonLabel && (
          <Link to={buttonLink}>
            <Button>{buttonLabel}</Button>
          </Link>
        )}
      </div>

      <div className="w-full h-[1px] bg-slate-300/10 my-4"></div>

      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {data.map((item) => {
              if (type === "blog") {
                const blogItem = item as Blog;
                return (
                  <Thumbnail
                    key={blogItem.slug}
                    item={blogItem}
                    className={ThumbnailClass}
                    aspectRatio="square"
                    width={width}
                    height={height}
                    type={type}
                  />
                );
              } else if (type === "project") {
                const blogItem = item as Project;
                return (
                  <Thumbnail
                    key={blogItem.slug}
                    item={blogItem}
                    className={ThumbnailClass}
                    aspectRatio="square"
                    width={width}
                    height={height}
                    type={type}
                  />
                );
              } else if (type === "message") {
                const blogItem = item as Message;
                return (
                  <Thumbnail
                    key={blogItem.id}
                    item={blogItem}
                    className={ThumbnailClass}
                    aspectRatio="square"
                    width={width}
                    height={height}
                    type={type}
                  />
                );
              } else if (type === "image") {
                const blogItem = item as Image;
                return (
                  <Thumbnail
                    key={blogItem.id}
                    item={blogItem}
                    className={ThumbnailClass}
                    aspectRatio="square"
                    width={width}
                    height={height}
                    type={type}
                  />
                );
              }
              return null;
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default ScrollSec;
