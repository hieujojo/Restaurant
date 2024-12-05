import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Booking{
  _id: string,
  table: string,
  user: string,
  startTime: string,
  endTime: string,
  date: string,
  dish: string[],
  totalmoney: number,
  type: string
}

interface BookingsState {
  bookings: Booking[];
}

const initialState: BookingsState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.bookings.findIndex(bookings => bookings._id === action.payload._id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
  },
});


export const { updateBooking, setBookings, addBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
