import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchBookingState = {
    query: string;
    results: any[];
};

const initialState: SearchBookingState = {
    query: '',
    results: [],
};

const searchBookingSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQueryBooking: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setSearchResultsBooking: (state, action: PayloadAction<any[]>) => {
            state.results = action.payload;
        },
    },
});

export const { setSearchQueryBooking, setSearchResultsBooking } = searchBookingSlice.actions;
export default searchBookingSlice.reducer;
