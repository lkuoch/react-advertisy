import * as React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ChakraProvider, localStorageManager, theme } from "@chakra-ui/react";

import { store } from "./store";
import App from "./components/index";

// Setup msw for mock data
if (!CONFIG.isProd) {
  const { worker } = await import("../mocks/mockServer");
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider colorModeManager={localStorageManager} theme={theme}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
