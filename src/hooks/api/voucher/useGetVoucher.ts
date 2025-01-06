"use client";

import useAxios from "@/hooks/useAxios";
import { Voucher } from "@/types/voucher";
import { useQuery } from "@tanstack/react-query";

interface GetVouchersQueries {
  token: string | undefined;
}

const useGetVouchers = ({token}:GetVouchersQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["vouchers", token],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Voucher[]>("/vouchers",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data || [];
    },

    enabled: !!token,

  });
};

export default useGetVouchers;