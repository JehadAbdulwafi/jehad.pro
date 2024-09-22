/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useToast } from "@components/ui/use-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axiosClient from "../../../axios-client";
import { Textarea } from "@components/ui/textarea";
import { ToastAction } from "@components/ui/toast";
import { Link, useNavigate } from "react-router-dom";
import { STATE } from "@constants/State";
import ImagePicker from "@components/Forms/ImagePicker";
import { Switch } from "@components/ui/switch";

const NewProject = () => {
  const [State, setState] = useState(STATE.IDLE);
  const [imageState, setImageState] = useState(STATE.IDLE);
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<FieldValues>({
    defaultValues: {
      title: "",
      desc: "",
      image: "",
      project_url: "",
      code_url: "",
      technologies: "",
      project_name: "",
      short_desc: "",
      project_icon: "",
      content: "",
      is_published: true,
      is_featured: false,
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    try {
      const response = await axiosClient.post("/projects", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setState(STATE.LOADING);

      if (response.status === 200) {
        setState(STATE.SUCCESS);
        navigate("/");
        toast({
          title: "Uploaded successfully",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-red-900 p-4">
              <code className="text-white">
                {JSON.stringify(response.data, null, 2)}
              </code>
            </pre>
          ),
          action: (
            <ToastAction altText="Goto schedule to undo">
              <Link to={"/blogs/new"}>added more</Link>
            </ToastAction>
          ),
        });
        form.reset();
      }
    } catch (error: unknown) {
      setState(STATE.ERROR);
      // @ts-ignore
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
    } finally {
      setState(STATE.IDLE);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">New Project</h2>
        <div className="flex items-center space-x-2"></div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center w-full md:justify-start gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="project_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="project_icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Icon</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Icon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row md:items-center w-full md:justify-start gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="project_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project url</FormLabel>
                    <FormControl>
                      <Input placeholder="Project url" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="code_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code url</FormLabel>
                    <FormControl>
                      <Input placeholder="Code url" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies</FormLabel>
                <FormControl>
                  <Input placeholder="Technologies" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="short_desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Input placeholder="Short Description" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ImagePicker
            onChange={(value) => setCustomeValue("image", value)}
            reset={() => setCustomeValue("image", "")}
            value={image}
            setState={setImageState}
            state={imageState}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-y max-w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row w-full gap-3">
            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem className="flex flex-row w-full items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Published</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_featured"
              render={({ field }) => (
                <FormItem className="flex flex-row w-full items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full">
            <Button
              type="submit"
              className="w-full"
              disabled={State === STATE.LOADING}
            >
              Upload
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewProject;
