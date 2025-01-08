import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface CreateTransactionPayload {
  eventId: number;
  quantity: number;
}

interface Transaction {
  id: number;
  eventId: number;
  eventName: string;
  quantity: number;
  totalPrice: number;
  status: 'WAITING_FOR_PAYMENT' | 'VERIFYING_PAYMENT' | 'PAYMENT_SUCCESS' | 'PAYMENT_FAILED';
  paymentDeadline: string;
}

export function useCreateTransaction() {
  return useMutation({
    mutationFn: async (payload: CreateTransactionPayload) => {
      const { data } = await axios.post<Transaction>('/transactions', payload);
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: "Transaction created",
        description: "Please complete your payment",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create transaction",
        variant: "destructive",
      });
    },
  });
}

