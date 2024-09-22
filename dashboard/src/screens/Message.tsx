import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import { STATE } from "@constants/State";
import { Message } from "@types/Message";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";

const MessagePage = () => {
  const { id } = useParams();
  const [State, setState] = useState(STATE.IDLE);
  const [message, setMessage] = useState<Message>();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const getMessage = async () => {
      try {
        setState(STATE.LOADING);
        const response = await axiosClient.get(`/messages/${id}`, { signal });
        const data = response.data as Message;
        if (response && response.status === 200) {
          setState(STATE.SUCCESS);
          setMessage(data);
        }
      } catch (error) {
        setState(STATE.ERROR);
        console.log(error);
      } finally {
        setState(STATE.IDLE);
      }
    };
    if (id) {
      getMessage();
    }

    return () => abortController.abort();
  }, [id]);

  return (
    <div className="mx-auto max-w-xl">
      <div className="mt-4 flex flex-col">
        <p className="text-muted-foreground">{message?.company}</p>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{message?.name}</div>
          <Button>delete</Button>
        </div>
        <Label className="text-lg mb-4">{message?.email}</Label>

        <p className="text-xs text-muted-foreground mb-2">{message?.message}</p>
        {message?.file && (
          <Link to={message.file} className="underline">
            {message?.file}
          </Link>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
