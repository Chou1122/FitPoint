import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserInfo {
  id: string | null;
  userName: string | null;
  email: string | null;
  password: string | null;
}

const initialState: UserInfo = {
  id: null,
  userName: null,
  email: null,
  password: null,
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.id = action.payload.id;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    clearUser: state => {
      state.id = null;
      state.userName = null;
      state.email = null;
      state.password = null;
    },
    setPasswordUser: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const {setUser, clearUser, setPasswordUser} = userSlice.actions;
export default userSlice.reducer;
