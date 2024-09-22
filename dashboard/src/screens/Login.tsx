import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { createRef, useRef } from "react";
import { useStateContext } from "../contexts/ContextProvider.js";
import { useState } from "react";

import { Button, buttonVariants } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useToast } from "@components/ui/use-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { STATE } from "@constants/State.js";
import { ToastAction } from "@components/ui/toast.js";
import { cn } from "@lib/utils.js";

export default function Login() {
  const { setUser, setToken } = useStateContext();

  const [State, setState] = useState(STATE.IDLE);
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await axiosClient.post("/login", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setState(STATE.LOADING);

      if (response.status === 200) {
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem("USER", JSON.stringify(response.data.user));
        setState(STATE.SUCCESS);
        navigate("/");
        toast({
          title: "Welcome back!",
          description: "Login successfully",
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
    <div>
      <div className="container relative h-[800px] flex-col items-center justify-center md:grid">
        <Link
          to="/signup"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Signup
        </Link>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          enterKeyHint="next"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          enterKeyHint="go"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={State === STATE.LOADING}
                >
                  {State === STATE.LOADING ? (
                    <Spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </Form>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const Spinner = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
