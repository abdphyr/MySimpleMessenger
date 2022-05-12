import { User } from "firebase/auth";
import { IDialog, IChannel, IChat, IMessage } from '../messages/message';
type Picker = "displayName" | "email" | "photoURL" | "isAnonymous" | "providerId" | "uid";
type CusUser = Pick<User, Picker>

export interface IUser {
  userID: string;
  username: string;
  email: string;
  password: string;
  dialog: boolean;
  chat: boolean;
  channel: boolean;
  role: "spektator" | "admin" | "member";
  channels: IChannel[];
  chats: IChat[];
  dialogs: IDialog[];
  first_name?: string;
  last_name?: string;
  img_url?: string;
}