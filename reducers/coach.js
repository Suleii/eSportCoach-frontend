import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { username: null,
    profile: {
      lastname: '',
      firstname: '',
      email: '',
      photo: '',
      games: [],
      price: {
        oneSession: 0,
        tenSessions: 0,
        oneGroupSession: 0,
        tenGroupSessions: 0,
      },
      socials: {
        twitch: '',
        instagram: '',
        youtube: '',
        discord: '',
      },
      about: '',
      bookings: [],
    },
    isEditing: false,
  }};

export const userSlice = createSlice({
  name: 'coach',
  initialState,
  reducers: {
    displayProfile: (state, action) => {
      state.value.username = action.payload.username;
    },
    updateProfile: (state, action) => {
      state.profile = action.payload;
    },
    toggleEdit: (state) => {
      state.isEditing = !state.isEditing;
    },
  },
});

export const { displayProfile, updateProfile, toggleEdit } = userSlice.actions;
export default userSlice.reducer;