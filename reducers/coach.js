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

export const coachSlice = createSlice({
  name: 'coach',
  initialState,
  reducers: {
    displayProfile: (state, action) => {
      state.value.username = action.payload.username;
    },
  },
});

export const { displayProfile,} = coachSlice.actions;
export default coachSlice.reducer;
