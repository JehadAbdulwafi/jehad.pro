import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ArchiveX, EyeOff, Settings2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { cn } from "@lib/utils";
import { Blog } from "@types/Blog";
import { Project } from "@types/Project";
import { Message } from "@types/Message";
import { Image } from "@types/Image";
import axiosClient from "../../axios-client";
import { toast } from "./ui/use-toast";
import { Link, useNavigate } from "react-router-dom";

export interface Album {
  name: string;
  artist: string;
  cover: string;
}

export const listenNowAlbums: Album[] = [
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
  },
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
  },
];

export const madeForYouAlbums: Album[] = [
  {
    name: "Thinking Components",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80",
  },
  {
    name: "Functional Fury",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80",
  },
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1446185250204-f94591f7d702?w=300&dpr=2&q=80",
  },
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
  },
];
const playlists = [
  "Recently Added",
  "Recently Played",
  "Top Songs",
  "Top Albums",
  "Top Artists",
  "Logic Discography",
  "Bedtime Beats",
  "Feeling Happy",
  "I miss Y2K Pop",
  "Runtober",
  "Mellow Days",
  "Eminem Essentials",
];

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  item: Blog | Image | Message | Project;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  type: string;
}

export function Thumbnail({
  item,
  aspectRatio = "portrait",
  width,
  height,
  type,
  className,
  ...props
}: AlbumArtworkProps) {
  let Content = null;
  const navigate = useNavigate();
  const handleDelete = async (endpoint: string, id: number) => {
    try {
      const response = await axiosClient.delete(`/${endpoint}/${id}`);
      toast({
        title: "deleted successfully",
        description: `the item with id ${id} from ${endpoint} has been deleted`,
      });
      navigate("/");
      // }
    } catch (error) {
      console.log(error);
      toast({
        title: "something went wrong!",
        description: `we got error when delete item with id: ${id} from ${endpoint}`,
      });
    }
  };

  if (type === "blog") {
    const ele = item as Blog;
    return (Content = (
      <div className={cn("space-y-3", className)} {...props}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="overflow-hidden rounded-md">
              <img
                src={ele.image}
                alt={ele.name}
                width={width}
                height={height}
                className={cn(
                  "h-auto w-auto object-cover bg-indigo-700 transition-all hover:scale-105",
                  aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
              />
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-40">
            <ContextMenuItem>Add to Featured</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Link className="flex items-center" to={`/blogs/${item.id}`}>
                <Settings2 className="mr-2 h-4 w-4" />
                <p>Edit</p>
              </Link>
            </ContextMenuItem>
            <ContextMenuItem>
              <EyeOff className="mr-2 h-4 w-4" />
              <p>Hide</p>
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => {
                if (type === "blog") {
                  handleDelete("posts", item.id);
                } else {
                  handleDelete("projects", item.id);
                }
              }}
            >
              <ArchiveX className="mr-2 h-4 w-4 text-red-400" />
              <p>Delete</p>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://jehad.pro/blog/${ele.slug}`
                );
              }}
            >
              Share
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none">{ele.name}</h3>
          <p className="text-xs text-muted-foreground">{ele.title}</p>
        </div>
      </div>
    ));
  }
  if (type === "project") {
    const ele = item as Project;
    return (Content = (
      <div className={cn("space-y-3", className)} {...props}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="overflow-hidden rounded-md">
              <img
                src={ele.image}
                alt={ele.project_name}
                width={width}
                height={height}
                className={cn(
                  "h-auto w-auto object-cover bg-indigo-700 transition-all hover:scale-105",
                  aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
              />
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-40">
            <ContextMenuItem>Add to Featured</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Link className="flex items-center" to={`/projects/${item.id}`}>
                <Settings2 className="mr-2 h-4 w-4" />
                <p>Edit</p>
              </Link>
            </ContextMenuItem>
            <ContextMenuItem>
              <EyeOff className="mr-2 h-4 w-4" />
              <p>Hide</p>
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => {
                handleDelete("projects", item.id);
              }}
            >
              <ArchiveX className="mr-2 h-4 w-4 text-red-400" />
              <p>Delete</p>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://jehad.pro/projects/${ele.slug}`
                );
              }}
            >
              Share
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none">{ele.project_name}</h3>
          <p className="text-xs text-muted-foreground">{ele.title}</p>
        </div>
      </div>
    ));
  }

  if (type === "message") {
    const ele = item as Blog;
    return (Content = (
      <div className={cn("space-y-3", className)} {...props}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="overflow-hidden rounded-md">
              <img
                src={ele.image}
                alt={ele.name}
                width={width}
                height={height}
                className={cn(
                  "h-auto w-auto object-cover bg-indigo-700 transition-all hover:scale-105",
                  aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
              />
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-40">
            <ContextMenuItem>Add to Library</ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                <ContextMenuItem>
                  <PlusCircledIcon className="mr-2 h-4 w-4" />
                  New Playlist
                </ContextMenuItem>
                <ContextMenuSeparator />
                {playlists.map((playlist) => (
                  <ContextMenuItem key={playlist}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
                    </svg>
                    {playlist}
                  </ContextMenuItem>
                ))}
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuItem>Play Next</ContextMenuItem>
            <ContextMenuItem>Play Later</ContextMenuItem>
            <ContextMenuItem>Create Station</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Like</ContextMenuItem>
            <ContextMenuItem>Share</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none">{ele.name}</h3>
          <p className="text-xs text-muted-foreground">{ele.title}</p>
        </div>
      </div>
    ));
  }

  if (type === "image") {
    const ele = item as Image;
    return (Content = (
      <div className={cn("space-y-3", className)} {...props}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="overflow-hidden rounded-md">
              <img
                src={ele.path}
                alt={ele.path}
                width={width}
                height={height}
                className={cn(
                  "h-auto w-auto object-cover bg-indigo-700 transition-all hover:scale-105",
                  aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
              />
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-40">
            <ContextMenuItem>
              <Settings2 className="mr-2 h-4 w-4" />
              <p>Edit</p>
            </ContextMenuItem>
            <ContextMenuItem>
              <EyeOff className="mr-2 h-4 w-4" />
              <p>Hide</p>
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleDelete("images", item.id)}>
              <ArchiveX className="mr-2 h-4 w-4 text-red-400" />
              <p>Delete</p>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() => {
                navigator.clipboard.writeText(ele.path);
              }}
            >
              Share
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    ));
  }

  return null;
}
