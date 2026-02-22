import { useMutation } from "@tanstack/react-query";
import verify from "@/services/api/verify";

const useVerify = () => {
  return useMutation({
    mutationFn: (token: string) => verify(token),
  });
};

export default useVerify;