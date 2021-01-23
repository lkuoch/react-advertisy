import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions, selectors } from "@Core/App/redux";
import Customer from "@Components/Customer";
import Cart from "@Components/Cart";
import PriceSummary from "@Components/PriceSummary";

export default function App() {
  const dispatch = useDispatch();
  const appConfig = useSelector(selectors.selectAppConfig);

  useEffect(() => {
    dispatch(actions.initApp());
  }, []);

  return (
    <div id="app">
      <h3 className="ui block center aligned header">{appConfig.translation.appTitle}</h3>

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
