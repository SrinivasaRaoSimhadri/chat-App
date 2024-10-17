import { createSlice } from "@reduxjs/toolkit";
const modeSlice = new createSlice({
    name: "mode",
    initialState: [],
    reducers: {
        updateMode: (state, action) => {
            console.log(action.payload.length);
            return action.payload;
        },
        cleanMode: (state, action) => {
            return [];
        }
    }
})

export const {updateMode, cleanMode} = modeSlice.actions;
export default modeSlice.reducer;