export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber: string;
  confirmPassword: string;
  referralCode: string;
  profilePicture: string;
  address: string;
  totalReferralPoints: number;
}
