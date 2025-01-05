"use client";

import { useState, useEffect } from "react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch, FaSort, FaEllipsisH, FaFilter } from "react-icons/fa";

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
  customer: string;
  paymentMethod: string;
}

const initialTransactions: Transaction[] = [
  {
    id: "INV001",
    date: "2023-05-01",
    amount: 250.0,
    status: "ACCEPTED",
    customer: "John Doe",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV002",
    date: "2023-05-03",
    amount: 150.5,
    status: "REJECTED",
    customer: "Jane Smith",
    paymentMethod: "PayPal",
  },
  {
    id: "INV003",
    date: "2023-05-05",
    amount: 350.75,
    status: "FAILED",
    customer: "Alice Johnson",
    paymentMethod: "Debit Card",
  },
  {
    id: "INV004",
    date: "2023-05-07",
    amount: 450.25,
    status: "REFUNDED",
    customer: "Bob Brown",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV005",
    date: "2023-05-09",
    amount: 550.0,
    status: "ACCEPTED",
    customer: "Charlie Davis",
    paymentMethod: "Credit Card",
  },
];

export default function AdminTransactionHistory() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [sortColumn, setSortColumn] = useState<keyof Transaction | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status["code"] | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const filteredAndSortedTransactions = transactions
    .filter(
      (transaction) =>
        (statusFilter === null || transaction.status === statusFilter) &&
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

  const toggleStatusFilter = (statusCode: Status["code"] | null) => {
    setStatusFilter((prev) => (prev === statusCode ? null : statusCode));
  };

  const updateTransactionStatus = (id: string, newStatus: Status["code"]) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === id
          ? { ...transaction, status: newStatus }
          : transaction
      )
    );
  };

  const getStatusDetails = (statusCode: Status["code"]): Status => {
    return STATUSES.find((status) => status.code === statusCode) || STATUSES[0];
  };

  return (
      <div className="h-screen w-screen px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-5 text-2xl font-bold">Transaction History</h1>
        <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="relative w-full sm:w-auto">
            <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <FaFilter className="mr-2 h-4 w-4" />
                {statusFilter
                  ? getStatusDetails(statusFilter).label
                  : "Filter Status"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => toggleStatusFilter(null)}>
                All Statuses
              </DropdownMenuItem>
              {STATUSES.map((status) => (
                <DropdownMenuItem
                  key={status.code}
                  onSelect={() => toggleStatusFilter(status.code)}
                >
                  {status.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="overflow-x-auto">
          {isMobile ? (
            <div className="space-y-4">
              {filteredAndSortedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="rounded-lg border p-4 shadow-sm"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{transaction.id}</span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        getStatusDetails(transaction.status).color
                      }`}
                    >
                      {getStatusDetails(transaction.status).label}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>{transaction.customer}</p>
                    <p>{transaction.date}</p>
                    <p>${transaction.amount.toFixed(2)}</p>
                    <p>{transaction.paymentMethod}</p>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <FaEllipsisH className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            navigator.clipboard.writeText(transaction.id)
                          }
                        >
                          Copy transaction ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {transaction.status !== "ACCEPTED" && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateTransactionStatus(transaction.id, "ACCEPTED")
                            }
                          >
                            Mark as Accepted
                          </DropdownMenuItem>
                        )}
                        {transaction.status !== "REJECTED" && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateTransactionStatus(transaction.id, "REJECTED")
                            }
                          >
                            Mark as Rejected
                          </DropdownMenuItem>
                        )}
                        {transaction.status !== "FAILED" && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateTransactionStatus(transaction.id, "FAILED")
                            }
                          >
                            Mark as Failed
                          </DropdownMenuItem>
                        )}
                        {transaction.status !== "REFUNDED" && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateTransactionStatus(transaction.id, "REFUNDED")
                            }
                          >
                            Mark as Refunded
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit transaction</DropdownMenuItem>
                        <DropdownMenuItem>Send receipt</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Table>
              <TableCaption>A list of all transactions</TableCaption>
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
                      onClick={() => handleSort("customer")}
                      className="p-0 font-bold"
                    >
                      Customer
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
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("paymentMethod")}
                      className="p-0 font-bold"
                    >
                      Payment Method
                      <FaSort className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.customer}</TableCell>
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
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <FaEllipsisH className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              navigator.clipboard.writeText(transaction.id)
                            }
                          >
                            Copy transaction ID
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {transaction.status !== "ACCEPTED" && (
                            <DropdownMenuItem
                              onClick={() =>
                                updateTransactionStatus(
                                  transaction.id,
                                  "ACCEPTED"
                                )
                              }
                            >
                              Mark as Accepted
                            </DropdownMenuItem>
                          )}
                          {transaction.status !== "REJECTED" && (
                            <DropdownMenuItem
                              onClick={() =>
                                updateTransactionStatus(
                                  transaction.id,
                                  "REJECTED"
                                )
                              }
                            >
                              Mark as Rejected
                            </DropdownMenuItem>
                          )}
                          {transaction.status !== "FAILED" && (
                            <DropdownMenuItem
                              onClick={() =>
                                updateTransactionStatus(
                                  transaction.id,
                                  "FAILED"
                                )
                              }
                            >
                              Mark as Failed
                            </DropdownMenuItem>
                          )}
                          {transaction.status !== "REFUNDED" && (
                            <DropdownMenuItem
                              onClick={() =>
                                updateTransactionStatus(
                                  transaction.id,
                                  "REFUNDED"
                                )
                              }
                            >
                              Mark as Refunded
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit transaction</DropdownMenuItem>
                          <DropdownMenuItem>Send receipt</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
  );
}

