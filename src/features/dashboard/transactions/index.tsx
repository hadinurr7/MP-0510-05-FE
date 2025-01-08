"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaSort, FaEllipsisV } from "react-icons/fa";
import { useSession } from "next-auth/react";


import LoadingScreen from "@/app/components/LoadingScreen";
import ErrorLoading from "@/app/components/ErrorLoading";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import useGetTransactionsByUser from "@/hooks/api/transaction/useGetTransactionsByUser";
import useUpdateTransactionStatus from "@/hooks/api/transaction/useUpdateTransactionsStatus";

export default function TransactionHistory() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const {
    data,
    isPending: isPendingGet,
    error,
  } = useGetTransactionsByUser({ token });
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");

  const { mutateAsync: updateTransactionStatus, isPending } =
    useUpdateTransactionStatus(token || "");

  const filteredAndSortedTransactions = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    const filtered = data.filter((transaction) => {
      return (
        (transaction.event?.name.toLowerCase() || "").includes(
          search.toLowerCase()
        ) ||
        (transaction.user?.fullname.toLowerCase() || "").includes(
          search.toLowerCase()
        ) ||
        (transaction.user?.email.toLowerCase() || "").includes(
          search.toLowerCase()
        ) ||
        (transaction.status.toLocaleLowerCase() || "").includes(
          search.toLowerCase()
        ) ||
        (transaction.payment?.[0]?.paymentProof?.toLocaleLowerCase() || "").includes(
          (search || "").toLowerCase()
        )
      );
    });

    return filtered.sort((a, b) => {
      const aDate = parseISO(a.createdAt);
      const bDate = parseISO(b.createdAt);

      return sortDirection === "asc"
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    });
  }, [data, search, sortDirection]);

  const handleSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleAcceptTransaction = async (transactionId: string) => {
    try {
      await updateTransactionStatus({
        transactionId: Number(transactionId),
        status: "SUCCESS",
      });
      toast.success(`Transaction ${transactionId} marked as SUCCESS!`);
    } catch (error) {
      toast.error("Failed to update transaction status.");
    }
  };

  const handleRejectTransaction = async (transactionId: string) => {
    try {
      await updateTransactionStatus({
        transactionId: Number(transactionId),
        status: "FAILED",
      });
      toast.success(`Transaction ${transactionId} marked as FAILED!`);
    } catch (error) {
      toast.error("Failed to update transaction status.");
    }
  };

  const handleViewPaymentProof = (paymentProofUrl: string) => {
    if (paymentProofUrl) {
      window.open(paymentProofUrl, "_blank");
    } else {
      toast.error("Payment proof not available.");
    }
  };

  if (isPendingGet) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingScreen />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <ErrorLoading />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-5 text-2xl font-bold">Transaction History</h1>
      <form className="mb-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full rounded-md border py-2 pl-4 pr-8"
            value={search}
            onChange={handleSearchChange}
          />
          <Button
            type="button"
            className="bg-blue-500 font-medium hover:bg-blue-600"
          >
            Search
          </Button>
        </div>
      </form>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableCaption>A list of your recent transactions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-bold text-black">
                Transaction ID
              </TableHead>
              <TableHead className="text-center">
                <Button
                  variant="ghost"
                  onClick={handleSort}
                  className="p-0 font-bold text-black"
                >
                  Date
                  {sortDirection === "asc" ? (
                    <FaSort className="ml-2 h-4 w-4 rotate-180" />
                  ) : (
                    <FaSort className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Customer Name
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Customer Email
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Event Name
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Quantity
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Total Price
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Status
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-center">
                    {transaction.id}
                  </TableCell>
                  <TableCell className="text-center">
                    {format(parseISO(transaction.createdAt), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="text-center">
                    {transaction.user?.fullname}
                  </TableCell>
                  <TableCell className="text-center">
                    {transaction.user?.email}
                  </TableCell>
                  <TableCell className="text-center">
                    {transaction.event?.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {transaction.qty}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(transaction.totalPrice)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                        transaction.status === "WAITING"
                          ? "bg-gray-200 text-gray-600"
                          : transaction.status === "VERIFYING"
                          ? "bg-yellow-100 text-yellow-600"
                          : transaction.status === "SUCCESS"
                          ? "bg-green-200 text-green-600"
                          : transaction.status === "FAILED"
                          ? "bg-red-200 text-red-800"
                          : ""
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" disabled={isPending}>
                          <FaEllipsisV className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            handleAcceptTransaction(transaction.id.toString())
                          }
                          disabled={isPending}
                        >
                          Accept
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleRejectTransaction(transaction.id.toString())
                          }
                          disabled={isPending}
                        >
                          Reject
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem
                          onClick={() =>
                            handleViewPaymentProof(transaction?.payment?.[0]?.paymentProof || "")
                          }
                        >
                          View Payment Proof
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
