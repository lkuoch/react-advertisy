import { createSlice } from "@reduxjs/toolkit";

declare global {
  // Make CONFIG globally available
  var CONFIG: typeof import("@Config");
}

interface IState {}

// Slice details
const name = "APP";

const initialState: IState = {};

const { actions, reducer } = createSlice({
  name,
  initialState,
  reducers: {
    initApp: (state) => state,
  },
});

const selectors = {};

export { initialState, actions, reducer, selectors, name };
