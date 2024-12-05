import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface Table {
    _id: string,
    name: string;
    type: string;
    description: string;
    image: string[];
    quantity: number;
  }
interface TablesState {
    tables: Table[],
}
const initialState: TablesState = {
    tables : [],
}
const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
      addTable: (state, action: PayloadAction<Table>) => {
        state.tables.push(action.payload);
      },
        updateTable: (state, action: PayloadAction<Table>) => {
            const index = state.tables.findIndex(table => table._id === action.payload._id);
            if (index !== -1) {
              state.tables[index] = action.payload;
            }
          },
        setTable: (state, action: PayloadAction<Table[]>) => {
            state.tables = action.payload;
        }
    }
});

export const {setTable, updateTable, addTable} = tableSlice.actions;
export default tableSlice.reducer;