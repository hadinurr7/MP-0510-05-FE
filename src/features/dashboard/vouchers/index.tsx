"use client";

import LoadingScreen from "@/app/components/LoadingScreen";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useGetVouchers from "@/hooks/api/voucher/useGetVoucher";
import { format, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";

const VoucherPage = () => {

  const { data: session } = useSession();
  const token = session?.user.token;
  const { data, isLoading, error } = useGetVouchers({ token });

  if (isLoading) return <LoadingScreen />;
  if (error) return <div>Error fetching vouchers: {error.message}</div>;

  return (
    <div className="container mx-auto  px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <h1 className="mb-4 text-2xl font-bold sm:mb-0">Voucher List</h1>
        <Button className="w-full bg-blue-500 font-medium hover:bg-blue-600 sm:w-auto">
          <Link href="/dashboard/my-event/create-voucher">Create Voucher</Link>
        </Button>
      </div>

      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>A list of active vouchers</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Voucher Code</TableHead>
                <TableHead>Event Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Expired Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((voucher) => (
                  <TableRow key={voucher.id}>
                    <TableCell>
                      <Badge variant="outline">{voucher.voucherCode}</Badge>
                    </TableCell>
                    <TableCell>{voucher.event?.name}</TableCell>
                    <TableCell>Rp. {voucher.value.toFixed(0)}</TableCell>
                    <TableCell>{voucher.qty}</TableCell>
                    <TableCell>
                      <span
                        className={
                          voucher.validUntil && (voucher.validUntil) < new Date()
                            ? "text-red-500"
                            : "text-green-500"
                        }
                      >
                        {voucher.validUntil
                          ? format((voucher.validUntil), "dd MMM yyyy")
                          : "No expiration date"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No vouchers available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="space-y-4 md:hidden">
        {data && data.length > 0 ? (
          data.map((voucher) => (
            <Card key={voucher.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <Badge variant="outline">{voucher.voucherCode}</Badge>
                  <span className="text-sm font-normal">ID: {voucher.id}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-medium">Event Name</dt>
                    <dd>{voucher.event?.name}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Value</dt>
                    <dd>Rp. {voucher.value.toFixed(0)}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Quantity</dt>
                    <dd>{voucher.qty}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="font-medium">d Date</dt>
                    <dd
                      className={
                        voucher.validUntil && new Date(voucher.validUntil) < new Date()
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {voucher.validUntil
                        ? format(new Date(voucher.validUntil), "dd MMM yyyy")
                        : "No expiration date"}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-6 text-center text-gray-500">
              No vouchers available
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VoucherPage;
