import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface Evalue {
    star: number;
    comment: string;
    idUser: string; 
  }
interface Dish {
    _id: string,
    name: string;
    chef: string[]; 
    description: string;
    evalue: Evalue[];
    image: string[];
    price: string;
    type: string;
  }
interface DishesState {
    dishes: Dish[],
}
const initialState: DishesState = {
    dishes : [],
}
const dishSlice = createSlice({
    name: "dish",
    initialState,
    reducers: {
      addDish: (state, action: PayloadAction<Dish>) => {
        state.dishes.push(action.payload);
      },
        updateDish: (state, action: PayloadAction<Dish>) => {
            const index = state.dishes.findIndex(dish => dish._id === action.payload._id);
            if (index !== -1) {
              state.dishes[index] = action.payload;
            }
          },
        setDish: (state, action: PayloadAction<Dish[]>) => {
            state.dishes = action.payload;
        }
    }
});

export const {setDish, updateDish, addDish} = dishSlice.actions;
export default dishSlice.reducer;