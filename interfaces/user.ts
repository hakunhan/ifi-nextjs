import { Document } from 'mongoose';

export interface IUser extends Document{
  _id: number;
  role: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  activated: boolean;
}