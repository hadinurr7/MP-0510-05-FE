"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useAxios from "../../useAxios";

interface UpdateTransactionStatusPayload {
  transactionId: number;
  status: string;
}

// Define the shape of your error response if known
// interface ErrorResponse {
//   message: string;
// }

// const useUpdateTransactionStatus = () => {
//   const router = useRouter();
//   const { axiosInstance } = useAxios();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (payload: UpdateTransactionStatusPayload) => {
//       const { data } = await axiosInstance.patch(
//         `/transactions/${payload.transactionId}`,
//         { status: payload.status },
//       );
//       return data;
//     },
//     onSuccess: () => {
//       toast.success("Transaction status updated");
//       queryClient.invalidateQueries({ queryKey: ["OrganizerTransactions"] });
//       router.push("/transactions");
//     },
//     onError: (error: AxiosError<ErrorResponse>) => {
//       toast.error(
//         error.response?.data?.message || error.message || "An error occurred while updating the transaction status"
//       );
//     },
//   });
// };

// export default useUpdateTransactionStatus;


// interface UpdateTransactionStatusPayload {
//   transactionId: number;
//   status: string;
// }

// Define the shape of your error response if known
interface ErrorResponse {
  message: string;
}

const useUpdateTransactionStatus = (token : string) => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: async (payload: UpdateTransactionStatusPayload) => {
      const { data } = await axiosInstance.patch(
        `/transactions/update-status/${payload.transactionId}`,
        { status: payload.status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        
      );
      return data;
    },
  });
};

export default useUpdateTransactionStatus;
