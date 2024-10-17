import { createSlice } from "@reduxjs/toolkit";
const socketSlice = new createSlice({
    name: "socket",
    initialState: null,
    reducers: {
        addConnection: (state, action) => {
            return action.payload
        },
        removeConnection: (state, action) => {
            return null;
        }
    }
})

export const { addConnection, removeConnection} = socketSlice.actions;
export default socketSlice.reducer;