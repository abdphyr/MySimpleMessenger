import { configureStore } from '@reduxjs/toolkit';  
import userSlice from './user.slice'
import chatSlice from './chat.slice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chat: chatSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch