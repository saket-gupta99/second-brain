import { useMutation } from "@tanstack/react-query";
import { shareLink as shareLinkAPI } from "../libs/apiContent";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { errorMessage } from "../libs/utils";

export function useShareLink() {
  const { mutate: shareLink, isPending } = useMutation<
    ApiResponse<null>,
    AxiosError<ApiError>,
    { share: boolean }
  >({
    mutationFn: (data) => shareLinkAPI(data),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      const errMsg = errorMessage(err);
      toast.error(errMsg);
    },
  });

  return { shareLink, isPending };
}
