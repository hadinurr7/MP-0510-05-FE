"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface RegisterPayload {
  fullname: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await axiosInstance.post("/auth/register", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("register success");
      router.replace("/login");
    },
    onError: (error: AxiosError<any>) => {
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    },
  });
};

export default useRegister;
