import { useQuery } from "@tanstack/react-query";
import { showLinkToVisitors } from "../libs/apiContent";

export function useShowLinkToVisitors(shareLink: string) {
  const { data: showToVisitors, isLoading } = useQuery({
    queryKey: ["showToVisitors", shareLink],
    queryFn: () => showLinkToVisitors(shareLink),
    enabled: !!shareLink
  });

  return { showToVisitors, isLoading };
}
