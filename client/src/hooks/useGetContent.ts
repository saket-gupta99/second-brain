import { useQuery } from "@tanstack/react-query";
import { getContent } from "../libs/apiContent";

export function useGetContent() {
  const { data: userContents, isLoading } = useQuery<
    ApiResponse<Content[]>,
    ApiError
  >({
    queryKey: ["content"],
    queryFn: getContent,
  });

  return { userContents, isLoading };
}
