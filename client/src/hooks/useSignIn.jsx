import { useMutation } from "@tanstack/react-query";
import api from "../api";

const useSignIn = () => {
  return useMutation({
    mutationFn: (data) => {
      return api({
        url: "/sign-in",
        method: "POST",
        data
      })
    }
  })
}

export default useSignIn;
