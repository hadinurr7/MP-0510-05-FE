'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Clock, Upload, CheckCircle, XCircle } from 'lucide-react'
import axios from 'axios'

interface TransactionDetailsProps {
  id: string;
  status: 'WAITING_FOR_PAYMENT' | 'VERIFYING_PAYMENT' | 'PAYMENT_SUCCESS' | 'PAYMENT_FAILED';
  paymentDeadline: string | null;
}

export default function TransactionDetails({ id, status, paymentDeadline }: TransactionDetailsProps) {
  const [file, setFile] = useState<File | null>(null)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  useEffect(() => {
    if (status === 'WAITING_FOR_PAYMENT' && paymentDeadline) {
      const updateTimer = () => {
        const now = new Date().getTime()
        const deadline = new Date(paymentDeadline).getTime()
        const difference = deadline - now
        setTimeLeft(Math.max(0, difference))
      }

      updateTimer()
      const timer = setInterval(updateTimer, 1000)

      return () => clearInterval(timer)
    }
  }, [status, paymentDeadline])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('proof', file)

    try {
      await axios.post(`/api/transaction/${id}/upload-proof`, formData)
      toast({
        title: "Success",
        description: "Payment proof uploaded successfully",
      })
      // Refresh the page to show updated status
      window.location.reload()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload payment proof",
        variant: "destructive",
      })
    }
  }

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      {status === 'WAITING_FOR_PAYMENT' && timeLeft !== null && (
        <div className="text-center p-4 bg-orange-100 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-orange-600">
            <Clock className="h-4 w-4" />
            <span>Time Remaining for Payment</span>
          </div>
          <div className="text-2xl font-bold text-orange-600 mt-2">
            {formatTime(timeLeft)}
          </div>
        </div>
      )}

      {status === 'WAITING_FOR_PAYMENT' && (
        <div className="space-y-2">
          <Label htmlFor="proof">Upload Payment Proof</Label>
          <Input id="proof" type="file" onChange={handleFileChange} />
          <Button className="w-full" onClick={handleUpload} disabled={!file}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Payment Proof
          </Button>
        </div>
      )}

      {status === 'VERIFYING_PAYMENT' && (
        <div className="text-center p-4 bg-blue-100 rounded-lg">
          <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <p className="text-blue-600">Payment proof is being verified</p>
        </div>
      )}

      {status === 'PAYMENT_SUCCESS' && (
        <div className="text-center p-4 bg-green-100 rounded-lg">
          <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <p className="text-green-600">Payment successful</p>
        </div>
      )}

      {status === 'PAYMENT_FAILED' && (
        <div className="text-center p-4 bg-red-100 rounded-lg">
          <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <p className="text-red-600">Payment failed</p>
        </div>
      )}
    </div>
  )
}

