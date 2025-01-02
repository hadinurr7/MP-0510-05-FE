"use client";

import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface GetEventsQueries extends PaginationQueries {
  categoryId?: number;
  cityId?: number;
  search?:string
}

const useGetEvents = (queries: GetEventsQueries) => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search') || '';

  return useQuery({
    queryKey: ["events", queries, searchValue],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        "/events",
        { 
          params: {
            ...queries,
            search: searchValue
          }
        },
      );
      return data;
    },
  });
};

export default useGetEvents;