import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../libs/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { errorMessage } from "../libs/utils";

type LoginData = {
  token: string;
  user: {
    _id: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export function useLogin() {
  const query = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation<
    ApiResponse<LoginData>,
    AxiosError<ApiError>,
    Login
  >({
    mutationFn: (data) => loginAPI(data),
    onSuccess: (data) => {
      toast.success(data.message);
      query.setQueryData(["user"], data.data.user);
      navigate("/home");
    },
    onError: (err: AxiosError) => {
      const errMsg = errorMessage(err);
      toast.error(errMsg);
    },
  });

  return { login, isPending };
}
