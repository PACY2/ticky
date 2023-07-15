import api from "../api"
import { useQuery } from "@tanstack/react-query"

const useGetMyComplaints = () => {
  return useQuery({
    queryKey: ["myComplaints"],
    queryFn: () => {
      return api({
        url: "/complaints/me"
      })
    }
  })
}

export default useGetMyComplaints
