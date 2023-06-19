/**
 * YAN HU HAIR
 *
 * Authentication information
 *
 * @author Zhaoyu Guo
 */

import { useGetUserQuery } from "@/redux/services/user";
import { UserResponse } from "@/typings/user";

const useAuth = (): {
  user: UserResponse["user"];
  authUser: UserResponse["authUser"];
  isLoading: boolean;
  signOut: string;
} => {
  const { data: user, error, isLoading } = useGetUserQuery(undefined);

  return {
    user: user?.user,
    authUser: user?.authUser,
    isLoading,
    signOut: "/api/auth/logout",
  };
};

export default useAuth;
