import { User } from "./user";

export interface Event {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  categoryId: number
  userId: number;
  cityId: number;
  startDate: string;
  endDate: string;
  price: number;
  availableSeats: number;
  createdAt: string;
  updatedAt: string;

  city : string
category : string
}


