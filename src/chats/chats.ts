import { rdb } from "../app/firebase.config";
import { ref } from 'firebase/database';
import { IChatState } from '../redux/chat.slice';

export const chatsDBRef = (chats: IChatState, tab: number) => {
  const { dialog, group, channel } = chats
  if (dialog || tab === 0) {
    return ref(rdb, `dialogs`)
  } else if (group || tab === 1) {
    return ref(rdb, `groups`)
  } else if (channel || tab === 2) {
    return ref(rdb, `channels`)
  } else {
    return ref(rdb, `messages/selfmessages`)
  }
}
export const dialogDBRef = ref(rdb, `dialogs`)