import { configureStore } from '@reduxjs/toolkit';
import miscReducer from './miscSlice';
// import { Socket, socketMiddleware } from "@/utils/Socket";

export const store = configureStore({
    reducer: {
        misc: miscReducer
    },
    // middleware: getDefaultMiddleware => [socketMiddleware(new Socket()), ...getDefaultMiddleware()],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;