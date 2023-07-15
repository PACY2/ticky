import { useQuery } from "@tanstack/react-query"
import api from "../api";

const useGetComplaintsNature = () => {
  return useQuery({
    queryKey: ["complaintsNature"],
    queryFn: () => {
      return api({
        url: "/complaints/natures"
      })
    }
  })
}

export default useGetComplaintsNature
