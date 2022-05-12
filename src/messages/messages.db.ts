import { rdb } from "../app/firebase.config";
import { ref } from 'firebase/database';
import { IChatState } from '../redux/chat.slice';


export const messagesDBRef = (chats: IChatState) => {
  const { self, dialog, group, channel } = chats
  if (self) {
    return ref(rdb, `messages/${self.userID}`)
  } else if (dialog) {
    return ref(rdb, `messages/${dialog.dialog_id}`)
  } else if (group) {
    return ref(rdb, `messages/${group.group_id}`)
  } else if (channel) {
    return ref(rdb, `messages/${channel.channel_id}`)
  } else {
    return ref(rdb, `messages/selfmessages`)
  }
}
