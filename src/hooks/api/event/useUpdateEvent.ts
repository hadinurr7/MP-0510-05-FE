"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

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

const updateEvent = async (
  eventId: number,
  payload: UpdateEventPayload,
  token: string | undefined
) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== null) {
      formData.append(key, value);
    }
  });

  const { data } = await axiosInstance.put(`/events/${eventId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: ({
      eventId,
      payload,
    }: {
      eventId: number;
      payload: UpdateEventPayload;
    }) => {
      // Ambil token dari session
      const token = session?.user.token;
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      // Panggil fungsi updateEvent dengan token
      return updateEvent(eventId, payload, token);
    },
    onSuccess: () => {
      // Setelah sukses, invalidate cache dari event
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
