import { combineReducers } from "redux";

import { name as appName, reducer as appReducer } from "@Core/App/redux";
import { name as cartName, reducer as cartReducer } from "@Core/Cart/redux";
import { name as customerName, reducer as customerReducer } from "@Core/Customer/redux";
import { name as priceSummaryName, reducer as priceSummaryNameReducer } from "@Core/PriceSummary/redux";

export default combineReducers({
  [appName]: appReducer,
  [cartName]: cartReducer,
  [customerName]: customerReducer,
  [priceSummaryName]: priceSummaryNameReducer,
});
