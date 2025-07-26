import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContent as createContentAPI } from "../libs/apiContent";
import toast from "react-hot-toast";
import { errorMessage } from "../libs/utils";
import type { AxiosError } from "axios";

interface ContentResponse extends Content {
  _id: string;
  createdAt: Date;
  udpatedAt: Date;
}

export function useCreateContent() {
  const queryClient = useQueryClient();
  const { mutate: createContent, isPending } = useMutation<
    ApiResponse<ContentResponse>,
    AxiosError<ApiError>,
    FormContent
  >({
    mutationFn: (data) => createContentAPI(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({queryKey: ["content"]});
    },
    onError: (err) => {
      const errMsg = errorMessage(err);
      toast.error(errMsg);
    },
  });

  return { createContent, isPending };
}
