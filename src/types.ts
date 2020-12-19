import type { IApp, name as AppName } from "@Containers/App/redux";
import type { ICart, name as CartName } from "@Containers/Cart/redux";
import type {
  ICustomer,
  name as CustomerName,
} from "@Containers/Customer/redux";
import type {
  IPriceSummary,
  name as PriceSummaryName,
} from "@Containers/PriceSummary/redux";

// Config file
interface IConfig {
  readonly translation: {
    readonly appTitle: string;
  };
}

// Redux store state
interface IRootState {
  [AppName]: IApp.IState;
  [CartName]: ICart.IState;
  [CustomerName]: ICustomer.IState;
  [PriceSummaryName]: IPriceSummary.IState;
}

export { IConfig, IRootState, IApp, ICart, ICustomer, IPriceSummary };
