import { rdb } from "../app/firebase.config";
import { ref, set, get , update, remove, onValue, child } from "firebase/database";
import { useMutation, useQuery } from 'react-query';
import { IUser } from "./auth";
import { v4 } from "uuid";

const usersDBRef = ref(rdb, `users`)

const saveUser = async (user: IUser) => {
  return set(child(usersDBRef, user.userID), user)
}

const updateUser = async (user: IUser) => {
  return update(child(usersDBRef, user.userID), user)
}

// Save user to relatime database 
export const useSaveUser = () => {
  return useMutation(saveUser)
}

// Update user in relatime database 
export const useUpdateUser = () => {
  return useMutation(updateUser)
}

// get user from realtime database 
export const getUser = async (userID: string) => {
  let userSnapshot = await get(child(usersDBRef, `/${userID}`));
  const user = userSnapshot.val() as IUser
  return user
}




// get users from realtime database 
export const getUsers = async () => {
  let usersSnapshot = await get(usersDBRef);
  const usersObj = Object.values(usersSnapshot.val())
  const users = usersObj as IUser[]
  return users
}
export const useGetUsers = () => {
  return useQuery(['users'], getUsers)
}