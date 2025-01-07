import { number } from "yup"

export interface Transactions {
    length: number
    id : number
    name:string
    point: number
    qty : number
    totalPrice:number
    status: string
    createdAt: string
    updatedAt: string
    user: {
        fullname: string;
        email: string;
      };
    event: {
        name: string;
        qty: number;
        totalPrice: number;
      }
    payment: {
      paymenStatus: string
      paymentMethod: string
      paymentProof:string
    }[]
}