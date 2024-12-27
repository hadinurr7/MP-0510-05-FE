import { User } from "./user";

export interface Event {
  id: number;
  name: string;
  image: string;
  description: string;
  categoryId: number
  userId: number;
  cityId: number;
  startDate: string;
  endDate: string;
  price: number;
  createdAt: string;
  updatedAt: string;

}
