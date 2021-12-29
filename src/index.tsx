import * as React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Provider } from "jotai";

import App from "./components/index";

// Setup msw for mock data
if (!CONFIG.isProd) {
  const { worker } = await import("../mocks/mockServer");
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
