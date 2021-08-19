export interface Account{
  id: number;
  role: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  activated: boolean;
}