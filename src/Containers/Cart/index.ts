import { Dispatch } from "redux";
import { connect } from "react-redux";

import { selectors, actions } from "./redux";
import { selectors as appSelectors } from "@Containers/App/redux";
import { selectors as customerSelectors } from "@Containers/Customer/redux";
import CartComponent from "./Components";
import type { IRootState, ICart } from "@AppTypes";

const mapStateToProps = (state: IRootState): ICart.IStateProps => {
  const appConfig = appSelectors.selectAppConfig(state);
  const currentCustomer = customerSelectors.selectCurrentCustomer(state);
  const customerSelections = customerSelectors.selectCustomerSelections(state);
  const products = selectors.selectProducts(state);
  const currentOffers = customerSelectors.selectCurrentOffers(
    state,
    currentCustomer
  );

  return {
    appConfig,
    currentCustomer,
    customerSelections,
    products,
    currentOffers,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ICart.IDispatchProps => ({
  handleProductSelection: (payload) =>
    dispatch(actions.handleProductSelection(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
