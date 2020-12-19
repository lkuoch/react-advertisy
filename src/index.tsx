import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "@Core/store";
import AppContainer from "@Containers/App";

import "fomantic-ui-css/semantic.css";
import "@Styles/app.less";

ReactDOM.render(
  <Provider store={configureStore()}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);
