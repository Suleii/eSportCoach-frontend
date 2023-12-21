import { createSlice } from '@reduxjs/toolkit';

const initialState = {
value: { token: null, username: null, firstname: null , isCoach: false, photo:null},
};

export const userSlice = createSlice({
name: 'user',
initialState,
reducers: {
login: (state, action) => {
state.value.token = action.payload.token;
state.value.username = action.payload.username;
state.value.firstname = action.payload.firstname;
state.value.isCoach = action.payload.isCoach;
},
logout: (state) => {
state.value.token = null;
state.value.username = null;
state.value.firstname = null;
state.value.isCoach = false;
},
avatar: (state, action) => {
    state.value.photo = action.payload.photo;
  },
},
});

export const { login, logout, avatar } = userSlice.actions;
export default userSlice.reducer;