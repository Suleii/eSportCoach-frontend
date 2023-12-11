import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { username: null },
};

export const userSlice = createSlice({
  name: 'coach',
  initialState,
  reducers: {
    displayProfile: (state, action) => {
      state.value.username = action.payload.username;
    },
  },
});

export const { displayProfile } = userSlice.actions;
export default userSlice.reducer;