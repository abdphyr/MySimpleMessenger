import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from '../auth/auth'

interface IInitUser {
  user: IUser | null,
}

const initialUser: IInitUser = {
  user: null,
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialUser,
  reducers: {
    userRegister: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    userLogin: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    userEdit: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    userLogout: (state) => {
      state.user = null
      localStorage.removeItem('user')
    },
  }
})

export const { userRegister, userLogin, userLogout, userEdit } = userSlice.actions
export default userSlice