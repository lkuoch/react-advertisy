import { store } from "./index";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
