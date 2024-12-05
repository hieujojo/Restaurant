import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface New{
  _id: string;
  content: string;
  image: string | File;
  slug: string;
  title: string;
  type: string;
}

interface NewsState {
  news: New[];
}

const initialState: NewsState = {
  news: [],
};

const newSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNew: (state, action: PayloadAction<New>) => {
      state.news.push(action.payload);
    },
    updateNew: (state, action: PayloadAction<New>) => {
      const index = state.news.findIndex(news => news._id === action.payload._id);
      if (index !== -1) {
        state.news[index] = action.payload;
      }
    },
    setNews: (state, action: PayloadAction<New[]>) => {
      state.news = action.payload;
    },
  },
});


export const { updateNew, setNews, addNew } = newSlice.actions;

export default newSlice.reducer;
