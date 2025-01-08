"use client";
import useAxios from "@/hooks/useAxios";
import { EventResponse } from "@/types/event";
import { useQuery } from "@tanstack/react-query";


const useGetEventsByUser = (token : string) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<EventResponse>("/events",{
        headers: {
          Authorization:`Bearer ${token}`
        },
      });
      return data || {data:[]};
    },
        enabled: !!token,

  });
};

export default useGetEventsByUser;