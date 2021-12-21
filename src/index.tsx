import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "jotai";

import App from "./components/index";
import "./styles/app.less";

(async () => {
  // Setup msw for mock data
  if (!CONFIG.isProd) {
    const { worker } = await import("../mocks/mockServer");
    await worker.start();
  }

  ReactDOM.render(
    <React.StrictMode>
      <Provider>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
})();
