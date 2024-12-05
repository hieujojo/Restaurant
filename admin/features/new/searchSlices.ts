import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchNewState = {
    query: string;
    results: any[];
};

const initialState: SearchNewState = {
    query: '',
    results: [],
};

const searchNewSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQueryNew: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setSearchResultsNew: (state, action: PayloadAction<any[]>) => {
            state.results = action.payload;
        },
    },
});

export const { setSearchQueryNew, setSearchResultsNew } = searchNewSlice.actions;
export default searchNewSlice.reducer;
