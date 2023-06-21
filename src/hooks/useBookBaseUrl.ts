import { useParams } from "next/navigation";

const useBookBaseUrl = () => {
  const params = useParams();

  return `/book/${params?.userId as string}`;
};

export default useBookBaseUrl;
