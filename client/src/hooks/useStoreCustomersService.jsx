import { useMutation } from "@tanstack/react-query";
import api from "../api";

const useStoreCustomersService = () => {
  return useMutation({
    mutationFn: (data) => {
      return api({
        url: "/customers_service",
        method: "POST",
        data
      });
    }
  })
}

export default useStoreCustomersService;
