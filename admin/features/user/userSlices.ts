import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    _id: string;
    img: string | File;
    name: string;
    password: string;
    email: string;
    phone: string;
    gender: string;
    isAdmin: boolean;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});


export const { updateUser, setUsers, addUser } = userSlice.actions;

export default userSlice.reducer;
