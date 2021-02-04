import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { getStore } from "@Store/index";
import App from "@Components/index";

import "@Styles/app.less";

const store = getStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
