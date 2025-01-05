"use client";

import { useMemo, useState } from "react";
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
import useGetTransactions from "@/hooks/api/transactions/useGetTransactions";
import LoadingScreen from "@/app/components/LoadingScreen";
import ErrorLoading from "@/app/components/ErrorLoading";
import { format, parseISO } from "date-fns";

interface Transaction {
  id: string;
  qty: number;
  totalPrice: number;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserTransactionHistory() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const { data, isPending: isPendingGet, error } = useGetTransactions({ token });
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");

  const filteredAndSortedTransactions = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    const filtered = data.filter((transaction) => {
      const { id, name } = transaction;
      return (
        transaction.event.name.toLowerCase().includes(search.toLowerCase())
      );
    });

    // Sort transactions based on createdAt
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
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-5 text-2xl font-bold">Transaction History</h1>
      <form className="mb-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-4 pr-8 py-2 border rounded-md"
            value={search}
            onChange={handleSearchChange}
          />
          <Button type="button" className="absolute right-0 top-0 h-full px-4">
            Search
          </Button>
        </div>
      </form>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableCaption>A list of your recent transactions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-black font-bold">ID</TableHead>
              <TableHead className="text-center">
                <Button
                  variant="ghost"
                  onClick={handleSort}
                  className="p-0 text-black font-bold"
                >
                  Date
                  <FaSort className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-center text-black font-bold">Name</TableHead>
              <TableHead className="text-center text-black font-bold">Qty</TableHead>
              <TableHead className="text-center text-black font-bold">Total Price</TableHead>
              <TableHead className="text-center text-black font-bold">Status</TableHead>
              <TableHead className="text-center text-black font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="text-center">{transaction.id}</TableCell>
                <TableCell className="text-center">{format(parseISO(transaction.createdAt), "dd MMM yyyy")}</TableCell>
                <TableCell className="text-center">{transaction.event.name}</TableCell>
                <TableCell className="text-center">{transaction.qty}</TableCell>
                <TableCell className="text-center">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(transaction.totalPrice)}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      transaction.status === "SUCCESS"
                        ? "bg-green-200 text-green-600"
                        : transaction.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-600"
                        : transaction.status === "FAILED"
                        ? "bg-red-200 text-red-800"
                        : transaction.status === "CANCELED"
                        ? "bg-gray-200 text-gray-600"
                        : ""
                    }`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <FaEllipsisV className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => alert(`Viewing details for transaction ${transaction.id}`)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert(`Downloading receipt for transaction ${transaction.id}`)}>
                        Download Receipt
                      </DropdownMenuItem>
                      {transaction.status === "ACCEPTED" && (
                        <DropdownMenuItem onClick={() => alert(`Requesting refund for transaction ${transaction.id}`)}>
                          Request Refund
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
