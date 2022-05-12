import { auth } from '../app/firebase.config';
import { useMutation } from 'react-query';
import { signInWithEmailAndPassword } from 'firebase/auth';

const login = ({ email, password }: { email: string, password: string }) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const useUserLogin = () => {
  return useMutation(login)
}