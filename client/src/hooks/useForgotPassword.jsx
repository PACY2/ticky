import { useMutation } from "@tanstack/react-query";
import api from "../api";

const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data) => {
      return api({
        url: "/forgot-password",
        method: "POST",
        data
      })
    }
  })
}

export default useForgotPassword;
