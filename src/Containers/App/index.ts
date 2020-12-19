import { Dispatch } from "redux";
import { connect } from "react-redux";

import { actions, selectors } from "./redux";
import AppComponent from "./Components";
import type { IRootState, IApp } from "@AppTypes";

const mapStateToProps = (state: IRootState): IApp.IStateProps => ({
  appConfig: selectors.selectAppConfig(state),
});

const mapDispatchToProps = (dispatch: Dispatch): IApp.IDispatchProps => ({
  initApp: () => dispatch(actions.initApp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
