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

import LoadingScreen from "@/app/components/LoadingScreen";
import ErrorLoading from "@/app/components/ErrorLoading";
import { format, parseISO } from "date-fns";
import useGetTransactions from "@/hooks/api/transaction/useGetTransactions";

export default function UserTransactionHistory() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const {
    data,
    isPending: isPendingGet,
    error,
  } = useGetTransactions({ token });
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  const filteredAndSortedTransactions = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    const filtered = data.filter((transaction) => {
      return transaction.event?.name
        .toLowerCase()
        .includes(search.toLowerCase());
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

  const handleUploadPaymentProof = (transactionId: number, file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("paymentProof", file);
    formData.append("transactionId", transactionId.toString());

    // Kirim file ke API untuk diproses
    fetch("/api/upload-payment-proof", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUploading(false);
        alert("Payment proof uploaded successfully!");
        // Update UI atau lakukan refresh untuk menampilkan bukti pembayaran
      })
      .catch((error) => {
        setUploading(false);
        alert("Error uploading payment proof.");
      });
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
    <div className="container mx-auto h-screen w-screen px-4 py-10 sm:px-6 lg:px-8">
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
              <TableHead className="text-center font-bold text-black">
                ID
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
                Name
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Qty
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
              <TableHead className="text-center font-bold text-black">
                Upload Payment Proof
              </TableHead>{" "}
              {/* New column */}
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
                    {transaction.event.name}
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
                        <DropdownMenuItem
                          onClick={() =>
                            alert(
                              `Viewing details for transaction ${transaction.id}`,
                            )
                          }
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            alert(
                              `Downloading receipt for transaction ${transaction.id}`,
                            )
                          }
                        >
                          Download Receipt
                        </DropdownMenuItem>
                        {transaction.status === "ACCEPTED" && (
                          <DropdownMenuItem
                            onClick={() =>
                              alert(
                                `Requesting refund for transaction ${transaction.id}`,
                              )
                            }
                          >
                            Request Refund
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-center">
                    <input
                      type="file"
                      onChange={(e) =>
                        handleUploadPaymentProof(
                          transaction.id,
                          e.target.files?.[0]!,
                        )
                      }
                      className="border p-2"
                    />
                    {uploading && <span>Uploading...</span>}
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
