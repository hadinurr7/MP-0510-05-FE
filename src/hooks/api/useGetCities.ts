// hooks/api/useGetCategories.ts
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";



const useGetCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/cities");
      return data;
    },
  });
};

export default useGetCities;