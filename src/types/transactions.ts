export interface Transactions {
    transactions: any
    length: number
    id : number
    name:string
    point: number
    qty : number
    totalPrice:number
    status: string
    createdAt: Date
    updatedAt: Date
}

export enum TransactionStatus {
    WAITING = "WAITING",
    VERIFYING = "VERIFYING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
  }