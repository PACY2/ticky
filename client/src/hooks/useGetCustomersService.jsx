import { useQuery } from "@tanstack/react-query";
import api from "../api";

const useGetCustomersService = () => {
  return useQuery({
    queryKey: ["customersService"],
    queryFn: () => {
      return api({
        url: "/customers_service"
      })
    }
  })
}

export default useGetCustomersService;
