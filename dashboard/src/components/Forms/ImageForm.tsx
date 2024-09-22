import { useState } from "react";
import { Form } from "@components/ui/form";
import { useToast } from "@components/ui/use-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axiosClient from "../../../axios-client";
import ImagePicker from "./ImagePicker";
import { ToastAction } from "@components/ui/toast";
import { Link, useNavigate } from "react-router-dom";

const STATE = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const ImageForm = () => {
  const [State, setState] = useState(STATE.IDLE);
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<FieldValues>({
    defaultValues: {
      image: "",
    },
  });
  const image = form.watch("image");

  const setCustomeValue = (id: string, value: unknown) => {
    form.setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axiosClient
      .post("/images", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setState(STATE.LOADING);

        if (res.status === 200) {
          setState(STATE.SUCCESS);
          navigate("/");
          toast({
            title: "Uploaded successfully",
            description: "",
            action: (
              <ToastAction altText="Goto schedule to undo">
                <Link to={"/blogs/new"}>added more</Link>
              </ToastAction>
            ),
          });
          form.reset();
        }
      })
      .catch((err) => {
        setState(STATE.ERROR);
        const response = err.response;
        console.log(err);
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
      })
      .finally(() => {
        setState(STATE.IDLE);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ImagePicker
          onChange={(value) => setCustomeValue("image", value)}
          reset={() => setCustomeValue("image", "")}
          value={image}
          setState={setState}
          state={State}
        />
        {image && (
          <div>
            <Link to={image} target="_blank">
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                {image}
              </code>
            </Link>
          </div>
        )}
      </form>
    </Form>
  );
};

export default ImageForm;
