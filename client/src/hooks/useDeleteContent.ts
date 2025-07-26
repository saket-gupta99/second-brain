import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContent as deleteContentAPI } from "../libs/apiContent";
import toast from "react-hot-toast";
import { errorMessage } from "../libs/utils";
import type { AxiosError } from "axios";

export function useDeleteContent() {
  const queryClient = useQueryClient();
  const { mutate: deleteContent, isPending } = useMutation<
    ApiResponse<null>,
    AxiosError<ApiError>,
    { contentId: string }
  >({
    mutationFn: (data) => deleteContentAPI(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({queryKey: ["content"]});
    },
    onError: (err) => {
      const errMsg = errorMessage(err);
      toast.error(errMsg);
    },
  });

  return { deleteContent, isPending };
}
