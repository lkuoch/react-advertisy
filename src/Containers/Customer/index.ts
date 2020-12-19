import { Dispatch } from "redux";
import { connect } from "react-redux";

import { selectors, actions } from "./redux";
import CustomerComponent from "./Components";
import type { IRootState, ICustomer } from "@AppTypes";

const mapStateToProps = (state: IRootState): ICustomer.IStateProps => ({
  customers: selectors.selectCustomers(state),
  currentCustomer: selectors.selectCurrentCustomer(state),
  customerSelections: selectors.selectCustomerSelections(state),
});

const mapDispatchToProps = (dispatch: Dispatch): ICustomer.IDispatchProps => ({
  updateCurrentCustomer: (payload) =>
    dispatch(actions.updateCurrentCustomer(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerComponent);
