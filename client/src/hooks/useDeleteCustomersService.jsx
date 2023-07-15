import { useMutation } from "@tanstack/react-query";
import api from "../api";

const useDeleteCustomersService = () => {
  return useMutation({
    mutationFn: (id) => {
      return api({
        url: `/customers_service/${id}`,
        method: "DELETE"
      })
    }
  })
}

export default useDeleteCustomersService;
