import { useGetUserInfoQuery } from "@/redux/services/user";
import { useParams } from "next/navigation";

const useGetUserInfo = () => {
  const params = useParams();

  const { data: userInfo, isLoading: isUserLoading } = useGetUserInfoQuery(
    params?.userId as string
  );

  return {
    isUserLoading,
    ...userInfo,
  };
};

export default useGetUserInfo;
