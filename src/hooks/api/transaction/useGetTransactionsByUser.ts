import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Transactions } from "@/types/transactions";

interface GetTransactionsQueries {
  token: string | undefined;
}

const useGetTransactionsByUser = ({ token }: GetTransactionsQueries) => {
  return useQuery({
    queryKey: ["transactions", token],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Transactions[]>("/transactions/organizer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token,
  });
};

export default useGetTransactionsByUser;
