import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISelf, IDialog, IChannel, IGroup } from '../chats/chat';

export interface IChatState {
  open: boolean;
  self: ISelf | null;
  dialog: IDialog | null;
  channel: IChannel | null;
  group: IGroup | null;

}

const initialChat: IChatState = {
  open: false,
  self: null,
  dialog: null,
  channel: null,
  group: null
}

export const chatSlice = createSlice({
  name: 'chatSlice',
  initialState: initialChat,
  reducers: {
    closeAll: (state) => {
      state.open = false
      state.self = null
      state.dialog = null
      state.channel = null
      state.group = null
    },
    setSelf: (state, action: PayloadAction<ISelf>) => {
      state.open = true
      state.self = action.payload
      state.dialog = null
      state.channel = null
      state.group = null
    },
    setDialog: (state, action: PayloadAction<IDialog>) => {
      state.self = null
      state.open = true
      state.dialog = action.payload
      state.channel = null
      state.group = null
    },
    setGroup: (state, action: PayloadAction<IGroup>) => {
      state.self = null
      state.open = true
      state.dialog = null
      state.group = action.payload
      state.channel = null
    },
    setChannel: (state, action: PayloadAction<IChannel>) => {
      state.self = null
      state.open = true
      state.dialog = null
      state.group = null
      state.channel = action.payload
    },
  }
})

export default chatSlice
export const { closeAll, setSelf, setDialog, setGroup, setChannel } = chatSlice.actions