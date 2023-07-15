import { useQuery } from "@tanstack/react-query";
import api from "../api";

const useGetServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      return api({
        url: "/services",
      });
    }
  })
}

export default useGetServices;
