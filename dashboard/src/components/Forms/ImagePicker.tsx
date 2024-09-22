import { useCallback } from "react";
import { ImagePlus, ArchiveX } from "lucide-react";
import { Label } from "@components/ui/label";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import axiosClient from "../../../axios-client";
import { STATE } from "@constants/State";
import { Toast, ToastAction } from "@components/ui/toast";
import { Link } from "react-router-dom";
import { toast } from "@components/ui/use-toast";

type Props = {
  onChange: (value: unknown) => void;
  setState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  value: string | null;
  reset: () => void;
};

const ImagePicker = ({ onChange, value, reset, setState, state }: Props) => {
  const handleUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData();
      formData.append("image", e.target.files![0]);
      axiosClient
        .post("/images", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          setState(STATE.LOADING);

          if (res.status === 200) {
            setState(STATE.SUCCESS);
            onChange(res.data.path);
            toast({
              title: "Uploaded Image Successfully",
              description: "",
              action: (
                <ToastAction altText="Goto schedule to undo">
                  <Link to={"/blogs/new"}>added more</Link>
                </ToastAction>
              ),
            });
          }
        })
        .catch((err) => {
          setState(STATE.ERROR);
          const response = err.response;
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
    },
    [onChange, setState]
  );

  return (
    <div className="w-full">
      {(state !== STATE.LOADING || state !== STATE.ERROR) && value ? (
        <div className="space-y-2">
          <Label>Pick a Image</Label>
          <div className="relative h-[450px]  w-full border-[1px] rounded-md items-center">
            <img
              src={value}
              alt="Image"
              className="rounded-md w-full h-[448px] object-contain"
            />
            <div className="absolute p-4 rounded-full hover:bg-gray-500/30 right-4 bottom-4">
              <ArchiveX onClick={reset} />
            </div>
          </div>
        </div>
      ) : (
        <FormItem>
          <FormLabel>Pick a Image</FormLabel>
          <FormControl className="w-full h-[450px] border-[1px] rounded-md ">
            <div>
              <label className="w-full h-[450px] flex items-center justify-center cursor-pointer">
                <div className="flex flex-col items-center">
                  <ImagePlus />
                  <p className="font-semibold text-lg">Pick a Image</p>
                </div>
                <input
                  className="h-0 w-0"
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                />
              </label>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    </div>
  );
};

export default ImagePicker;
