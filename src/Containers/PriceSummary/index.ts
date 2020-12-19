import { Dispatch } from "redux";
import { connect } from "react-redux";
import { selectors } from "./redux";
import PriceSummaryComponent from "./Components";
import type { IRootState, IPriceSummary } from "@AppTypes";

const mapStateToProps = (state: IRootState): IPriceSummary.IStateProps => ({
  prices: selectors.selectPrices(state),
});

const mapDispatchToProps = (
  _dispatch: Dispatch
): IPriceSummary.IDispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceSummaryComponent);
