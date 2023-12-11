import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { username: null },
};

export const coachSlice = createSlice({
  name: 'coach',
  initialState,
  reducers: {
    displayProfile: (state, action) => {
      state.value.username = action.payload.username;
    },
  },
});

export const { displayProfile } = coachSlice.actions;
export default coachSlice.reducer;