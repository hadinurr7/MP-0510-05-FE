"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Clock, Upload, CheckCircle, XCircle } from 'lucide-react';
import axios from "axios";
import useCreateTransactionAttachment from "@/hooks/api/transactions/useCreateTransactionAttachment";
import { TransactionStatus } from "@/types/transactions";

interface Transaction {
  id: number;
  eventId: number;
  eventName: string;
  quantity: number;
  totalPrice: number;
  status: TransactionStatus;
  paymentDeadline: string;
}

export default function TransactionDetails({ id }: { id: string }) {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { mutateAsync: uploadAttachment, isPending: isUploading } = useCreateTransactionAttachment();

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
    if (transaction?.status === "WAITING" && transaction.paymentDeadline) {
      const updateTimer = () => {
        const now = new Date().getTime();
        const deadline = new Date(transaction.paymentDeadline).getTime();
        const difference = deadline - now;
        setTimeLeft(Math.max(0, difference));
      };

      updateTimer();
      const timer = setInterval(updateTimer, 1000);

      return () => clearInterval(timer);
    }
  }, [transaction]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !transaction) return;

    try {
      await uploadAttachment({
        transactionId: transaction.id,
        file: file
      });
      
      // Refresh transaction data after successful upload
      const response = await axios.get(`/api/transactions/${id}`);
      setTransaction(response.data);
      setFile(null);
    } catch (error) {
      // Error handling is managed by the mutation
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

  if (!transaction) {
    return <div>Transaction not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {transaction.status === "WAITING" && timeLeft !== null && (
          <div className="text-center p-4 bg-orange-100 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-orange-600">
              <Clock className="h-4 w-4" />
              <span>Complete Payment Within</span>
            </div>
            <div className="text-2xl font-bold text-orange-600 mt-2">
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

          {transaction.status === "WAITING" && (
            <div className="space-y-2">
              <Label htmlFor="proof">Upload Payment Proof</Label>
              <Input 
                id="proof" 
                type="file" 
                onChange={handleFileChange}
                accept="image/*"
              />
              <Button
                className="w-full"
                onClick={handleUpload}
                disabled={!file || isUploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? "Uploading..." : "Upload Payment Proof"}
              </Button>
            </div>
          )}

          {transaction.status === "VERIFYING" && (
            <div className="text-center p-4 bg-blue-100 rounded-lg">
              <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-blue-600">Payment proof is being verified</p>
            </div>
          )}

          {transaction.status === "SUCCESS" && (
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-green-600">Payment successful</p>
            </div>
          )}

          {transaction.status === "FAILED" && (
            <div className="text-center p-4 bg-red-100 rounded-lg">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-red-600">Payment failed</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

