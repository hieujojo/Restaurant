import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Table {
    _id: string,
    name: string;
    type: string;
    description: string;
    image: string[];
    quantity: number;
  }
type SearchTableState = {
    queryTable: string;
    resultsTable: Table[];
};

const initialState: SearchTableState = {
    queryTable: '',
    resultsTable: [],
};

const searchTable = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQueryTable: (state, action: PayloadAction<string>) => {
            state.queryTable = action.payload;
        },
        setSearchResultsTable: (state, action: PayloadAction<any[]>) => {
            state.resultsTable = action.payload;
        },
    },
});

export const { setSearchQueryTable, setSearchResultsTable } = searchTable.actions;
export default searchTable.reducer;
