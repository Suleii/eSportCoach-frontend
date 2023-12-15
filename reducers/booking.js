import { createSlice } from '@reduxjs/toolkit';

const initialState = {
value: {
    date: null,
    game: "",
    coach: "",
    
},
};

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
    selectDate: (state, action) => {
    state.value.date = action.payload.date;
    state.value.coach = action.payload.coach;
    state.value.game = action.payload.game
    },
    },
    });
    
    export const { selectDate } = bookingSlice.actions;
    export default bookingSlice.reducer;