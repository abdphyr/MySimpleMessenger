import { auth } from '../app/firebase.config';
import { useMutation } from 'react-query';

const logout = (text: string) => auth.signOut()

export const useLogout = () => {
  return useMutation(logout)
}