"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAxios from "../../useAxios";

interface UpdateTransactionStatusPayload {
  transactionId: number;
  status: string;
  notes?: string;
}

const useUpdateTransactionStatus = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateTransactionStatusPayload) => {
      const { data } = await axiosInstance.patch(
        `/transactions/update-status/${payload.transactionId}`,
        { status: payload.status, notes: payload.notes },
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Transaction status updated");
      queryClient.invalidateQueries({ queryKey: ["OrganizerTransactions"] });
      router.push("/dashboard/transactions");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "update status error",
      );
    },
  });
};

export default useUpdateTransactionStatus;