import { useMutation } from "@tanstack/react-query";
import api from "../api";

const useSignOut = () => {
  return useMutation({
    mutationFn: () => {
      return api({
        url: "/sign-out",
        method: "POST",
      })
    }
  })
}

export default useSignOut;
