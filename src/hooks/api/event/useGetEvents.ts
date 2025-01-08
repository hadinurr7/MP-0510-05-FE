"use client";

import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetEventsQueries extends PaginationQueries {
  categoryId?: number;
  cityId?: number;
  search?:string
}

const useGetEvents = (queries: GetEventsQueries) => {

  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        "/events",
        { 
          params: {
            ...queries,
          }
        },
      );
      return data;
    },
  });
};

export default useGetEvents;