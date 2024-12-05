import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchUserState = {
    query: string;
    results: any[];
};

const initialState: SearchUserState = {
    query: '',
    results: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setSearchResults: (state, action: PayloadAction<any[]>) => {
            state.results = action.payload;
        },
    },
});

export const { setSearchQuery, setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
