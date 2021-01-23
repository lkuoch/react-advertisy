import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "@Core/store";
import App from "@Containers/App/Components";

import "fomantic-ui-css/semantic.css";
import "@Styles/app.less";

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
