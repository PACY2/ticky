import { useMutation } from "@tanstack/react-query"
import api from "../api"

const useCloseComplain = () => {
  return useMutation({
    mutationFn: (id) => {
      return api({
        url: `/complaints/${id}`,
        method: "POST",
      })
    }
  })
}

export default useCloseComplain
