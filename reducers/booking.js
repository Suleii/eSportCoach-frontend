import { createSlice } from '@reduxjs/toolkit';

const initialState = {
value: {
    date: null,
    nbOfSessions: 0,
},
};

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
    selectDate: (state, action) => {
    state.value.date = action.payload.date;
    state.value.nbOfSessions = action.payload.nbOfSessions
    },
    },
    });
    
    export const { selectDate } = bookingSlice.actions;
    export default bookingSlice.reducer;