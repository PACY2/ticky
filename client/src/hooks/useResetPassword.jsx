import { useMutation } from "@tanstack/react-query"
import api from "../api"

const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, data }) => {
      return api({
        url: `/reset-password/${token}`,
        method: "POST",
        data
      })
    }
  })
}

export default useResetPassword
