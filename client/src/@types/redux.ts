import { store } from "../redux/store";

//TS config types for component use
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
