import { getFirestore, collection, doc } from 'firebase/firestore';
import { app } from './firebase.config';

const db = getFirestore(app)
export const userCollectionRef = collection(db, "users")
export const userDocumentRef = (id: string) => doc(db, "users/", id)