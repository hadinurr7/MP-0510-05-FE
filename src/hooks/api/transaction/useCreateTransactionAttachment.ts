import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axios";

interface CreateTransactionAttachmentPayload {
  transactionId: number;
  file: File;
}

const useCreateTransactionAttachment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateTransactionAttachmentPayload) => {
      const formData = new FormData();
      formData.append("file", payload.file);

      const { data } = await axiosInstance.post(
        `/transactions/${payload.transactionId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      console.log("Transaction Attachment Uploaded Successfully");
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

export default useCreateTransactionAttachment;

