import { createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers, CaseReducer } from "@reduxjs/toolkit";

import config from "@Config";
import type { IConfig, IRootState } from "@AppTypes";

export namespace IApp {
  export interface IState {
    appConfig: IConfig;
  }

  export interface IActions extends SliceCaseReducers<IState> {
    initApp: CaseReducer<IState>;
  }
}

// Slice details
const name = "APP";

const initialState: IApp.IState = {
  appConfig: config,
};

const { actions, reducer } = createSlice<IApp.IState, IApp.IActions>({
  name,
  initialState,
  reducers: {
    initApp: (state) => state,
  },
});

const selectors = {
  selectAppConfig: (state: IRootState) => state[name].appConfig,
};

export { initialState, actions, reducer, selectors, name };
