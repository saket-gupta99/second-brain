import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../libs/apiAuth";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { errorMessage } from "../libs/utils";

type SignupData = {
  _id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
};

export function useSignup() {
  const { mutate:signup, isPending } = useMutation<
    ApiResponse<SignupData>,
    AxiosError<ApiError>,
    Signup
  >({
    mutationFn: (data) => signupAPI(data),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
        const errMsg = errorMessage(err);
        toast.error(errMsg);
    }
  });

  return {signup, isPending};
}
