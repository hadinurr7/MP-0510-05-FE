import TransactionDetails from "@/features/transaction/TransactionDetail";

export default function TransactionPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <TransactionDetails id={params.id} />
    </div>
  );
}

