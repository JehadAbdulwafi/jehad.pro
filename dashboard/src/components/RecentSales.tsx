import { Message } from "@types/Message";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "./ui/scroll-area";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@components/ui/dialog";
import { cn } from "@lib/utils";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import axiosClient from "../../axios-client";
import { toast } from "./ui/use-toast";

type Props = {
  messages: Message[];
};

const RecentSales = ({ messages }: Props) => {
  const navigate = useNavigate();
  const handleDeleteMessage = async (id: number, email: string) => {
    try {
      const response = await axiosClient.delete(`/messages/${id}`);

      if (response && response.status === 200) {
        navigate("/");
        toast({
          title: "Message deleted successfully",
          description: `the message from ${email} has been deleted`,
        });
      }
    } catch (error) {
      console.log(error);
      const response = error.response;
      console.log(error);
      if (response && response.status === 422) {
        if (response.data.errors) {
          toast({
            title: "something went wrong!",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-red-900 p-4">
                <code className="text-white">
                  {JSON.stringify(response.data.errors, null, 2)}
                </code>
              </pre>
            ),
          });
        } else {
          toast({
            title: "something went wrong!",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-red-900 p-4">
                <code className="text-white">
                  {JSON.stringify(response.data.message, null, 2)}
                </code>
              </pre>
            ),
          });
        }
      }
    }
  };

  return (
    <ScrollArea>
      <div className="space-y-3">
        {messages.map((message) => (
          <Dialog key={message.id}>
            <DialogTrigger
              className={cn("hover:bg-gray-900/40 w-full py-2 rounded-md")}
            >
              <div className={"flex items-center justify-between"}>
                <Avatar className="h-9 w-9">
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {message.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {message.email}
                  </p>
                </div>
                <div className="ml-auto font-medium">{message.company}</div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Message From {message.name}</DialogTitle>
                <DialogDescription>Email: {message.email}</DialogDescription>
              </DialogHeader>
              <div>
                <Label>{message.company}</Label>
                <DialogDescription>{message.message}</DialogDescription>
              </div>
              <div>
                <Link to={message.file} target="_blank">
                  <p>{message.file}</p>
                </Link>
              </div>
              <DialogFooter>
                <Link to={`mailto:${message.email}`}>
                  <Button>Send Message</Button>
                </Link>
                <DialogClose>
                  <Button
                    variant={"outline"}
                    onClick={() =>
                      handleDeleteMessage(message.id, message.email)
                    }
                  >
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </ScrollArea>
  );
};

export default RecentSales;
