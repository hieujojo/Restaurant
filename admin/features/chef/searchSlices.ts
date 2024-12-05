import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchChefState = {
    queryChef: string;
    resultsChef: any[];
};

const initialState: SearchChefState = {
    queryChef: '',
    resultsChef: [],
};

const searchChef = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQueryChef: (state, action: PayloadAction<string>) => {
            state.queryChef = action.payload;
        },
        setSearchResultsChef: (state, action: PayloadAction<any[]>) => {
            state.resultsChef = action.payload;
        },
    },
});

export const { setSearchQueryChef, setSearchResultsChef } = searchChef.actions;
export default searchChef.reducer;
