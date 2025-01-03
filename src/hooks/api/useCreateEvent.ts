import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axios";

export interface CreateEventPayload {
  name: string;
  description: string;
  price: number;
  availableSeats: number;
  thumbnail?: File | null;
  startDate: string;
  endDate: string;
  categoryId: number;
  cityId: number;
  userId: number;
}

const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      const formData = new FormData();

      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("price", `${payload.price}`);
      formData.append("availableSeats", `${payload.availableSeats}`);
      formData.append("thumbnail", payload.thumbnail!);
      formData.append("startDate", payload.startDate);
      formData.append("endDate", payload.endDate);
      formData.append("categoryId", `${payload.categoryId}`);
      formData.append("cityId", `${payload.cityId}`);

      const { data } = await axiosInstance.post(`/events`, formData);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      console.log("Event Updated Successfullly");
    },

    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "An error occurred";
      toast.error(errorMessage);
    },
  });
};

export default useCreateEvent;