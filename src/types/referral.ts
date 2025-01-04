import { User } from "./user";

export interface Referral {
  reffererId: number;
  refferredById: number;
  referrer: Pick<User, "fullname">;
  refferredBy: Pick<User, "fullname">;
  createdAt: Date;

}