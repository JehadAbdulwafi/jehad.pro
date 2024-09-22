import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { Link, useNavigate } from "react-router-dom";
import { Message } from "@types/Message";
import { ArchiveX, Send, MailCheck } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@components/ui/context-menu";
import { toast } from "@components/ui/use-toast";

const getMessages = async (signal: AbortSignal) => {
  try {
    const response = await axiosClient.get("/messages", { signal });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Messages = () => {
  const [messages, setMessages] = useState<Message[] | []>([]);

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

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      const MessagesPromise = getMessages(signal);
      try {
        const [messages] = await Promise.all([MessagesPromise]);
        console.log(messages);
        setMessages(messages);
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
        <h2 className="text-3xl font-bold tracking-tight">messages</h2>
        <div className="flex items-center space-x-2">
          <Button>Download</Button>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {messages &&
          messages.map((message) => (
            <li key={message.id} className="w-full">
              <ContextMenu>
                <ContextMenuTrigger>
                  <div className="overflow-hidden rounded-md">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                          <CardTitle className="text-sm font-medium">
                            {message.email}
                          </CardTitle>
                          <CardDescription>{message.company}</CardDescription>
                        </div>
                        <Link to={`/messages/${message.id}`}>
                          <Button>read</Button>
                        </Link>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{message.name}</div>
                        <p className="text-xs line-clamp-2 text-muted-foreground mb-2">
                          {message.message}
                        </p>
                        {message.file && (
                          <Link to={message.file} className="underline">
                            view file
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-40">
                  <ContextMenuItem>Add to Featured</ContextMenuItem>

                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <Link
                      className="flex items-center"
                      to={`/messages/${message.id}`}
                    >
                      <MailCheck className="mr-2 h-4 w-4" />
                      <p>read</p>
                    </Link>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Link
                      className="flex items-center"
                      to={`mailto:${message.email}`}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      <p>answer</p>
                    </Link>
                  </ContextMenuItem>
                  <ContextMenuItem
                    onClick={() => {
                      handleDelete("messages", message.id);
                    }}
                  >
                    <ArchiveX className="mr-2 h-4 w-4 text-red-400" />
                    <p>Delete</p>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Messages;
