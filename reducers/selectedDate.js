import { createSlice } from '@reduxjs/toolkit';

const initialState = {
value: {
    date: null
},
};

export const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
    selectDate: (state, action) => {
    state.value.date = action.payload;
    },
    },
    });
    
    export const { selectDate } = dateSlice.actions;
    export default dateSlice.reducer;