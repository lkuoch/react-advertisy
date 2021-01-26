import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "@Store/index";
import App from "@Components/index";

import "@Styles/app.less";

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
