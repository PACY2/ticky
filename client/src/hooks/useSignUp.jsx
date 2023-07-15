import { useMutation } from "@tanstack/react-query";
import api from "../api";

const useSignUp = () => {
  return useMutation({
    mutationFn: (data) => {
      return api({
        url: "/sign-up",
        method: "POST",
        data
      })
    }
  })
}

export default useSignUp;
