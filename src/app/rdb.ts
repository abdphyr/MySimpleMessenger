import { getDatabase, ref } from 'firebase/database';
import { app } from './firebase.config';

export const db = getDatabase(app)

const messagesDBRef =  ref(db, `messages`)
const messageDBRef = (id: string) => ref(db, `messages/${id}`)
export { messagesDBRef, messageDBRef }

