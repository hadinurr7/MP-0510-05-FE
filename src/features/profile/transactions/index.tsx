"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch, FaSort, FaEllipsisV } from "react-icons/fa";
import ProfileLayout from "../ProfileLayout";

interface Status {
  code: "ACCEPTED" | "REJECTED" | "FAILED" | "REFUNDED";
  label: string;
  color: string;
}

const STATUSES: Status[] = [
  { code: "ACCEPTED", label: "Accepted", color: "bg-green-100 text-green-800" },
  { code: "REJECTED", label: "Rejected", color: "bg-red-100 text-red-800" },
  { code: "FAILED", label: "Failed", color: "bg-orange-100 text-orange-800" },
  { code: "REFUNDED", label: "Refunded", color: "bg-blue-100 text-blue-800" },
];

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: Status["code"];
  description: string;
}

const initialTransactions: Transaction[] = [
  {
    id: "TRX001",
    date: "2023-05-01",
    amount: 250.0,
    status: "ACCEPTED",
    description: "Event ticket purchase",
  },
  {
    id: "TRX002",
    date: "2023-05-03",
    amount: 150.5,
    status: "REJECTED",
    description: "Merchandise order",
  },
  {
    id: "TRX003",
    date: "2023-05-05",
    amount: 350.75,
    status: "FAILED",
    description: "Workshop registration",
  },
  {
    id: "TRX004",
    date: "2023-05-07",
    amount: 450.25,
    status: "REFUNDED",
    description: "Cancelled event ticket",
  },
  {
    id: "TRX005",
    date: "2023-05-09",
    amount: 550.0,
    status: "ACCEPTED",
    description: "VIP package upgrade",
  },
];

export default function UserTransactionHistory() {
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [sortColumn, setSortColumn] = useState<keyof Transaction | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSortedTransactions = transactions
    .filter((transaction) =>
      Object.values(transaction).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortColumn === null) return 0;
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (column: keyof Transaction) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getStatusDetails = (statusCode: Status["code"]): Status => {
    return STATUSES.find((status) => status.code === statusCode) || STATUSES[0];
  };

  return (
    <ProfileLayout>
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-5 text-2xl font-bold">Transaction History</h1>
        <div className="mb-4">
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableCaption>A list of your recent transactions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("id")}
                    className="p-0 font-bold"
                  >
                    ID
                    <FaSort className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("date")}
                    className="p-0 font-bold"
                  >
                    Date
                    <FaSort className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("description")}
                    className="p-0 font-bold"
                  >
                    Description
                    <FaSort className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("amount")}
                    className="p-0 font-bold"
                  >
                    Amount
                    <FaSort className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("status")}
                    className="p-0 font-bold"
                  >
                    Status
                    <FaSort className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        getStatusDetails(transaction.status).color
                      }`}
                    >
                      {getStatusDetails(transaction.status).label}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
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
    </ProfileLayout>
  );
}

