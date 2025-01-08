"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Clock, Upload, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";
import { TransactionStatus } from "@/types/transactions";

interface TransactionDetailsProps {
  id: string;
  status: TransactionStatus;
  paymentDeadline: string | null;
}

// Tambahkan interface untuk data transaksi
interface Transaction {
  id: string;
  status: TransactionStatus;
  paymentDeadline: string | null;
  eventName: string;
  quantity: number;
  totalPrice: number;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  id,
  status: initialStatus,
  paymentDeadline: initialDeadline,
}) => {
  const [transaction, setTransaction] = useState<Transaction>({
    id,
    status: initialStatus,
    paymentDeadline: initialDeadline,
    eventName: "",
    quantity: 0,
    totalPrice: 0,
  });
  const [file, setFile] = useState<File | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`/api/transactions/${id}`);
        setTransaction(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch transaction details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  useEffect(() => {
    if (
      transaction?.status === TransactionStatus.WAITING &&
      transaction.paymentDeadline
    ) {
      const updateTimer = () => {
        const now = new Date().getTime();
        // Tambahkan pengecekan untuk paymentDeadline
        if (!transaction.paymentDeadline) {
          setTimeLeft(0);
          return;
        }

        try {
          const deadline = new Date(transaction.paymentDeadline).getTime();
          const difference = deadline - now;
          setTimeLeft(Math.max(0, difference));
        } catch (error) {
          console.error("Invalid date format:", error);
          setTimeLeft(0);
        }
      };

      updateTimer();
      const timer = setInterval(updateTimer, 1000);

      return () => clearInterval(timer);
    } else {
      setTimeLeft(null);
    }
  }, [transaction]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("proof", file);

    try {
      await axios.post(`/api/transactions/${id}/upload-proof`, formData);
      toast({
        title: "Success",
        description: "Payment proof uploaded successfully",
      });
      // Refresh transaction data
      const response = await axios.get(`/api/transactions/${id}`);
      setTransaction(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload payment proof",
        variant: "destructive",
      });
    }
  };

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {transaction.status === TransactionStatus.WAITING &&
          timeLeft !== null &&
          transaction.paymentDeadline && (
            <div className="rounded-lg bg-orange-100 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-orange-600">
                <Clock className="h-4 w-4" />
                <span>Complete Payment Within</span>
              </div>
              <div className="mt-2 text-2xl font-bold text-orange-600">
                {formatTime(timeLeft)}
              </div>
            </div>
          )}

        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label>Transaction ID</Label>
            <div className="font-medium">{transaction.id}</div>
          </div>

          <div className="grid gap-1">
            <Label>Event</Label>
            <div className="font-medium">{transaction.eventName}</div>
          </div>

          <div className="grid gap-1">
            <Label>Quantity</Label>
            <div className="font-medium">{transaction.quantity} tickets</div>
          </div>

          <div className="grid gap-1">
            <Label>Total Price</Label>
            <div className="font-medium">
              Rp {transaction.totalPrice.toLocaleString("id-ID")}
            </div>
          </div>

          {transaction.status === TransactionStatus.WAITING && (
            <div className="space-y-2">
              <Label htmlFor="proof">Upload Payment Proof</Label>
              <Input id="proof" type="file" onChange={handleFileChange} />
              <Button
                className="w-full"
                onClick={handleUpload}
                disabled={!file}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Payment Proof
              </Button>
            </div>
          )}

          {transaction.status === TransactionStatus.VERIFYING && (
            <div className="rounded-lg bg-blue-100 p-4 text-center">
              <CheckCircle className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <p className="text-blue-600">Payment proof is being verified</p>
            </div>
          )}

          {transaction.status === TransactionStatus.SUCCESS && (
            <div className="rounded-lg bg-green-100 p-4 text-center">
              <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <p className="text-green-600">Payment successful</p>
            </div>
          )}

          {transaction.status === TransactionStatus.FAILED && (
            <div className="rounded-lg bg-red-100 p-4 text-center">
              <XCircle className="mx-auto mb-2 h-8 w-8 text-red-600" />
              <p className="text-red-600">Payment failed</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionDetails;
