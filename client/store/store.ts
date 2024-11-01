
import { configureStore } from '@reduxjs/toolkit';
import errorReducer from '../features/slices/errorSlices';


export const store = configureStore({
  reducer: {
    error : errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// import { configureStore } from '@reduxjs/toolkit';
// import errorReducer from '@/features/slices/errorSlices';


// export const store = configureStore({
//   reducer: {
//     error : errorReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;