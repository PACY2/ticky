import { useMutation } from "@tanstack/react-query";
import api from "../api";

const useStoreComplain = () => {
  return useMutation({
    mutationFn: (data) => {
      return api({
        url: "/complaints",
        method: "POST",
        data
      })
    }
  })
};

export default useStoreComplain;
