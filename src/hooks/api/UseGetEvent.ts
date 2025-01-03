import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { useQuery } from "@tanstack/react-query";

const useGetEvent = (id: number) => {
  return useQuery({
    queryKey: ["events", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Event>(`/events/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 0,
  });
};

export default useGetEvent;
