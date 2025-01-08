import { User } from "./user";

export interface Event {
  city: string;
  voucher: any;
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  categoryId: number;
  userId: number;
  cityId: number;
  startDate: string;
  endDate: string;
  price: number;
  availableSeats: number;
  createdAt: string;
  updatedAt: string;
  cities: string;
  categories: string;
}

export interface Attendee {
  name: string;
  email: string;
  qty: number;
  totalPrice: number;


export interface EventResponse {
  data: {
    id: number;
    name: string;
    thumbnail: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    startDate: string;
    endDate: string;
    price: number;
    availableSeats: number;
    userId: number;
    cityId: number;
    categoryId: number;
    attendees?: Attendee[];
  }[];

  meta: {
    page: number;
    take: number;
    total: number;
  };
}
