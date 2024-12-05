import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface Chef {
    _id: string,
    name: string,
    image: string | File,
    description: string,
}
interface ChefsState {
    chefs: Chef[],
}
const initialState: ChefsState = {
    chefs : [],
}
const chefSlice = createSlice({
    name: "chef",
    initialState,
    reducers: {
        addChef: (state, action: PayloadAction<Chef>) => {
            state.chefs.push(action.payload);
          },
        updateChef: (state, action: PayloadAction<Chef>) => {
            const index = state.chefs.findIndex(chef => chef._id === action.payload._id);
            if (index !== -1) {
              state.chefs[index] = action.payload;
            }
          },
        setChef: (state, action: PayloadAction<Chef[]>) => {
            state.chefs = action.payload;
        }
    }
});

export const {setChef, updateChef, addChef} = chefSlice.actions;
export default chefSlice.reducer;