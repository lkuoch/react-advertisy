import { combineReducers } from "redux";

import { name as appName, reducer as appReducer } from "@Containers/App/redux";
import { name as cartName, reducer as cartReducer } from "@Containers/Cart/redux";
import { name as customerName, reducer as customerReducer } from "@Containers/Customer/redux";
import { name as priceSummaryName, reducer as priceSummaryNameReducer } from "@Containers/PriceSummary/redux";

export default combineReducers({
  [appName]: appReducer,
  [cartName]: cartReducer,
  [customerName]: customerReducer,
  [priceSummaryName]: priceSummaryNameReducer,
});
