import { store } from "./store";

export * from "./schema/generated";
export type RootState = ReturnType<typeof store.getState>;
