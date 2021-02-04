import { exposeStore } from "redux-in-worker";
import { configureStore } from "@Store/store";

exposeStore(configureStore());
