// hooks/api/event/useUpdateEvent.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface UpdateEventPayload {
  name: string;
  description: string;
  price: number;
  availableSeats: number;
  thumbnail: File | null;
  startDate: string;
  endDate: string;
  categoryId: number;
  cityId: number;
}

interface UpdateEventParams extends UpdateEventPayload {
  eventId: number;

}

const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ eventId, ...payload }: UpdateEventParams) => {
      const formData = new FormData();
      
      // Append all text fields
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("price", payload.price.toString());
      formData.append("availableSeats", payload.availableSeats.toString());
      formData.append("startDate", payload.startDate);
      formData.append("endDate", payload.endDate);
      formData.append("categoryId", payload.categoryId.toString());
      formData.append("cityId", payload.cityId.toString());

      // Append thumbnail if exists
      if (payload.thumbnail) {
        formData.append("thumbnail", payload.thumbnail);
      }

      const response = await axios.put(`/api/events/${eventId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event"] });
    },
  });
};

export default useUpdateEvent;