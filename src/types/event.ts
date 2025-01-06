import { User } from "./user";

export interface Event {
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
  city: string;
  category: string;
}

export interface EventResponse {
  data: {
    id: number
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
  }[];

  meta: {
    page: number;
    take: number;
    total: number;
  };
}
