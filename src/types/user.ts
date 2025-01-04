export interface User {
  id: number;
  fullname: string;
  email: string;
  password: string;
  phoneNumber: string;
  confirmPassword: string;
  referralCode: string;
  profilePicture: string;
  address: string;
  role: string;
  totalPoints: number;
  createdAt: Date;
  updatedAt: Date;
}
