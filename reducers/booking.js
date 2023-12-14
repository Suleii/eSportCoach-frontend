import { createSlice } from '@reduxjs/toolkit';

const initialState = {
value: {
    date: null,
    nbOfSessions: 0,
    coach: "",
},
};

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
    selectDate: (state, action) => {
    state.value.date = action.payload.date;
    state.value.nbOfSessions = action.payload.nbOfSessions;
    state.value.coach = action.payload.coach;
    },
    },
    });
    
    export const { selectDate } = bookingSlice.actions;
    export default bookingSlice.reducer;