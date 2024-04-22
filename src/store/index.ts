import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/UserSlice.ts'
import cartReducer from './slices/CartSlice.ts';

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
