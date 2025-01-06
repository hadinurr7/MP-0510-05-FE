import TransactionDetails from '@/features/transaction/TransactionDetail'

export default function Page({ params }: { params: { id: string } }) {
  return <TransactionDetails id={params.id} />
}

