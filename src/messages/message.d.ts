import { IUser } from "../auth/auth";


export interface IMessage {
  message_id: string;
  content: string;
  date: number;
  user: IUser;
  image?: string;
}