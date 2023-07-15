import { useQuery } from "@tanstack/react-query";
import api from "../api";

const useGetOrdersHistory = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      return api({
        url: "/orders/me",
      });
    }
  })
}

export default useGetOrdersHistory;
