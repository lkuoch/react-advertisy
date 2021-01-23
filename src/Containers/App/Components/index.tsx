import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions, selectors } from "@Containers/App/redux";
import Header from "./header";
import Customer from "@Containers/Customer/Components";
import Cart from "@Containers/Cart/Components";
import PriceSummary from "@Containers/PriceSummary/Components";

export default function App() {
  const dispatch = useDispatch();
  const appConfig = useSelector(selectors.selectAppConfig);

  useEffect(() => {
    dispatch(actions.initApp());
  }, []);

  return (
    <div id="app">
      <Header title={appConfig.translation.appTitle} />

      <div id="content">
        <Customer />

        <div id="checkout">
          <Cart />
          <PriceSummary />
        </div>
      </div>
    </div>
  );
}
