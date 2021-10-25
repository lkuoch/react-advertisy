import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { worker } from "./Mocks/browser";

import { store } from "@Store/index";
import App from "@Components/index";

import "@Styles/app.less";

function prepare() {
  if (process.env.NODE_ENV === "development") {
    return worker.start();
  }

  return Promise.resolve();
}

prepare().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});
