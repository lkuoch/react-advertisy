import { createSlice } from "@reduxjs/toolkit";

// declare global {
//   // Make CONFIG globally available
//   var CONFIG: typeof import("@Config");
// }

export interface IAppState {}

// Slice details
const name = "APP";

const initialState: IAppState = {};

const { actions, reducer } = createSlice({
  name,
  initialState,
  reducers: {
    initApp: (slice) => slice,
  },
});

const selectors = {};

export { initialState, actions, reducer, selectors, name };
