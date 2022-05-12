import { IUser } from "../auth/auth";

export interface ISelf extends IUser {

}

export interface IDialog {
  dialog_id: string;
  users: {
    user1: IUser;
    user2: IUser;
  }
  createDate: number;
}

export interface IChannel {
  channel_id: string;
  name: string;
  description: string;
  image: string;
  users: IUser[],
  createDate: string;
}

export interface IGroup {
  group_id: string;
  name: string;
  description: string;
  image: string;
  users: IUser[];
  createDate: string;
}