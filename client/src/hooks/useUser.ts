import { useQuery } from "@tanstack/react-query";
import { currentUser } from "../libs/apiAuth";

type User = {
  _id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
};

export function useUser() {
  const { data: user, isLoading } = useQuery<ApiResponse<User>, ApiError>({
    queryKey: ["user"],
    queryFn: currentUser,
    retry: false
  });

  return { user, isLoading, isAuthenticated: !!user };
}
