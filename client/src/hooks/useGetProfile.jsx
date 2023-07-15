import { useQuery } from "@tanstack/react-query"
import api from "../api"

const useGetProfile = () => {
  return useQuery({
    retry : false,
    queryKey: ["profile"],
    queryFn: () => {
      return api({
        url: "/me",
        method: "GET",
      })
    }
  })
}

export default useGetProfile
