import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
type SearchDishState = {
    queryDish: string;
    resultsDish: Dish[];
};

const initialState: SearchDishState = {
    queryDish: '',
    resultsDish: [],
};

const searchDish = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQueryDish: (state, action: PayloadAction<string>) => {
            state.queryDish = action.payload;
        },
        setSearchResultsDish: (state, action: PayloadAction<any[]>) => {
            state.resultsDish = action.payload;
        },
    },
});

export const { setSearchQueryDish, setSearchResultsDish } = searchDish.actions;
export default searchDish.reducer;
