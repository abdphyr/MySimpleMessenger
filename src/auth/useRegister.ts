import { auth } from '../app/firebase.config';
import { useMutation } from 'react-query';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const register = ({ email, password }: { email: string, password: string }) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const useUserRegister = () => {
  return useMutation(register)
}
