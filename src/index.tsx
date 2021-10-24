import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { worker } from "./Mocks/browser";

import { getStore } from "@Store/index";
import App from "@Components/index";

import "@Styles/app.less";

function prepare() {
  if (process.env.NODE_ENV === "development") {
    return worker.start();
  }

  return Promise.resolve();
}

prepare().then(() => {
  const store = getStore();

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});
