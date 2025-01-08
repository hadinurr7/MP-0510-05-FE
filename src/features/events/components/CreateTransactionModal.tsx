"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useCreateTransaction } from "@/hooks/api/transaction/useCreateTransaction"

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  eventName: string
  availableSeats: number
  price: number
  eventId: number
}

export default function TransactionModal({
  isOpen,
  onClose,
  eventName,
  availableSeats,
  price,
  eventId
}: TransactionModalProps) {
  const [quantity, setQuantity] = useState("1")
  const router = useRouter()
  const { mutateAsync: createTransaction, isPending } = useCreateTransaction()

  const handleConfirm = async () => {
    try {
      const result = await createTransaction({
        eventId,
        quantity: parseInt(quantity),
      })
      router.push(`/transaction/${result.id}`)
      onClose()
    } catch (error) {
      // Error handling is managed by the mutation
    }
  }

  const seatOptions = Array.from({ length: availableSeats }, (_, i) => (i + 1).toString())

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Beli Tiket</DialogTitle>
          <DialogDescription>
            {eventName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="seats" className="text-right">
              Jumlah
            </Label>
            <Select
              value={quantity}
              onValueChange={setQuantity}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih jumlah tiket" />
              </SelectTrigger>
              <SelectContent>
                {seatOptions.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value} tiket
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Total</Label>
            <div className="col-span-3 font-medium">
              Rp {(parseInt(quantity) * price).toLocaleString('id-ID')}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? "Processing..." : "Konfirmasi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
