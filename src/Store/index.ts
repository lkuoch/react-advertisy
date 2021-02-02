import { composeWithDevTools } from "redux-devtools-extension";
import { wrapStore } from "redux-in-worker";

import workerInit from "worker-loader!@Store/store.worker";
import { configureStore } from "./store";
import { initialState } from "./redux";

export function getStore() {
  if (CONFIG.features.serviceWorker.enabled) {
    return wrapStore(
      workerInit(),
      initialState,

      process.env.NODE_ENV !== "production" ? composeWithDevTools() : undefined
    );
  }

  return configureStore();
}
