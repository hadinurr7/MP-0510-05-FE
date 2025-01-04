import { User } from "./user";

export interface Referral {
  reffererId: number;
  refferredById: number;
  referrer: Pick<User, "name">;
  refferredBy: Pick<User, "name">;
  createdAt: Date;

}