import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from '@reduxjs/toolkit';

interface MiscState {
    isLaptop: boolean | null;
}

const initialState: MiscState = {
    isLaptop: null
};

export const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        setIsLaptop: (state, action: PayloadAction<boolean>) => {
            state.isLaptop = action.payload;
        }
    }
})

export const { setIsLaptop } = miscSlice.actions;
export default miscSlice.reducer;