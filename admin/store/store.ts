import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlices';
import errorReducer from '../features/slices/errorSlices';
import searchUserReducer from '../features/user/searchSlices';
import chefReducer from '../features/chef/chefSlice';
import searchChefReducer from '../features/chef/searchSlices';
import dishReducer from '../features/dish/dishSlice';
import searchDishReducer from '../features/dish/searchSlices';
import newReducer from '../features/new/newSlices';
import searchNewReducer from '../features/new/searchSlices';
import tableReducer from '../features/table/tableSlice';
import searchTableReducer from '../features/table/searchSlices';
import bookingReducer from '../features/booking/bookingSlices';
import searchBookingReducer from '../features/booking/searchSlices';

export const store = configureStore({
  reducer: {
    users: userReducer,
    error : errorReducer,
    searchUser: searchUserReducer,
    chefs: chefReducer,
    searchChef: searchChefReducer,
    dishes: dishReducer,
    searchDish: searchDishReducer,
    news: newReducer,
    searchNew: searchNewReducer,
    tables: tableReducer,
    searchTable: searchTableReducer,
    bookings: bookingReducer,
    searchBooking: searchBookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

