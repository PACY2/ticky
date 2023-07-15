import { useMutation } from "@tanstack/react-query";
import api from "../api";

const useCloseOrder = () => {
  return useMutation({
    mutationFn: (id) => {
      return api({
        url: `/orders/${id}`,
        method: "POST",
      })
    }
  })
}

export default useCloseOrder;
