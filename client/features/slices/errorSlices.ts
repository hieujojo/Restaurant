import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type ErrorState = {
    status: 'success' | 'danger' | null;
    message: string | null;
};

const initialState: ErrorState = {
    status: null,
    message: null,
};

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<{ status: 'success' | 'danger'; message: string }>) => {
            state.status = action.payload.status;
            state.message = action.payload.message;
        },
        clearError: (state) => {
            state.status = null;
            state.message = null;
        },
    },
});
export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;