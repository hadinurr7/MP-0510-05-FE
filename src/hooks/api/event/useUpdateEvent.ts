"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAxios from "../../useAxios";

interface UpdateEventPayload {
  name?: string;
  description?: string;
  categories?: string;
  city?: string;
  startDate?: string;
  endDate?: string;
  availableSeats?: number;
  price?: number;
  thumbnail?: File | null;
}

const useUpdateEvent = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateEventPayload;
    }) => {
      const updateEventForm = new FormData();

      if (payload.name) updateEventForm.append("name", payload.name);
      if (payload.description) updateEventForm.append("content", payload.description);
      if (payload.categories)
        updateEventForm.append("category", payload.categories);
      if (payload.city) updateEventForm.append("city", payload.city);
      if (payload.startDate)
        updateEventForm.append("starstartDatetTime", payload.startDate);
      if (payload.endDate) updateEventForm.append("endTime", payload.endDate);
      if (payload.availableSeats)
        updateEventForm.append("availableSeats", String(payload.availableSeats));
      if (payload.price) updateEventForm.append("price", String(payload.price));
      if (payload.thumbnail)
        updateEventForm.append("thumbnail", payload.thumbnail);

      const { data } = await axiosInstance.patch(
        `/events/edit-event/${id}`,
        updateEventForm,
      );

      return data;
    },
    onSuccess: async (data) => {
      toast.success("Event updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/events");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || "Failed to update event.");
    },
  });
};

export default useUpdateEvent;