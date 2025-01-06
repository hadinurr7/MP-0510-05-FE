"use client";
import useAxios from "@/hooks/useAxios";
import { Attendee } from "@/types/attendee";
import { useQuery } from "@tanstack/react-query";
import { strict } from "assert";

const useGetAttendeesByEvent = (eventId: number, token: string) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["attendees", eventId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Attendee[]>(
        `/attendees/${eventId}`,{
          headers: {
            Authorization:`Bearer ${token}`
          },
        }
      );
      return data || [];
    },
  });
};

export default useGetAttendeesByEvent;