import { combineReducers } from "redux";

import {
  name as appName,
  reducer as appReducer,
  initialState as appInitialState,
} from "@Core/App/redux";
import {
  name as cartName,
  reducer as cartReducer,
  initialState as cartInitialState,
} from "@Core/Cart/redux";
import {
  name as customerName,
  reducer as customerReducer,
  initialState as customerInitialState,
} from "@Core/Customer/redux";
import {
  name as priceSummaryName,
  reducer as priceSummaryNameReducer,
  initialState as priceSummaryInitialState,
} from "@Core/PriceSummary/redux";

export const initialState = {
  [appName]: appInitialState,
  [cartName]: cartInitialState,
  [customerName]: customerInitialState,
  [priceSummaryName]: priceSummaryInitialState,
};

export const rootReducer = combineReducers({
  [appName]: appReducer,
  [cartName]: cartReducer,
  [customerName]: customerReducer,
  [priceSummaryName]: priceSummaryNameReducer,
});
