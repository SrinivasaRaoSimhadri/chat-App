import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import modeSlice from "./modeSlice";
import socketSlice from "./socketSlice";
const appStore = configureStore({
    reducer: {
        user: userSlice,
        mode: modeSlice,
        socket: socketSlice
    }
})
export default appStore;