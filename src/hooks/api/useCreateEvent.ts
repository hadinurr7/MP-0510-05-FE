"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export interface CreateEventPayload {
  name: string;
  description: string;
  categoryId: number;
  startDate: string;
  endDate: string;
  price: number;
  cityId: number;
  availableSeats: number;
  thumbnail?: File | null;
  userId: number; // Tambahkan userId
}

const useCreateEvent = () => {
  const router = useRouter();
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
      formData.append("userId", `${payload.userId}`);

      const { data } = await axiosInstance.post("/events", formData);
      return data;
    },
    onSuccess: () => {
      toast.success("Event created successfully");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/");
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