import type { IApp, name as AppName } from "@Core/App/redux";
import type { ICart, name as CartName } from "@Core/Cart/redux";
import type { ICustomer, name as CustomerName } from "@Core/Customer/redux";
import type { IPriceSummary, name as PriceSummaryName } from "@Core/PriceSummary/redux";

// Redux store state
interface IRootState {
  [AppName]: IApp.IState;
  [CartName]: ICart.IState;
  [CustomerName]: ICustomer.IState;
  [PriceSummaryName]: IPriceSummary.IState;
}

export { IRootState, IApp, ICart, ICustomer, IPriceSummary };
