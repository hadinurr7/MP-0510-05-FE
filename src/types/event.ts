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
  availabeSeats: number;
  
  createdAt: string;
  updatedAt: string;

}
