import { useMutation } from "@tanstack/react-query"
import api from "../api"

const useStoreOrder = () => {
  return useMutation({
    mutationFn: (data) => {
      return api({
        url: "/orders",
        method: "POST",
        data
      })
    }
  })
}

export default useStoreOrder
