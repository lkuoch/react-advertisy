import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { actions } from "@Core/App/redux";
import Customer from "@Components/Customer";
import Cart from "@Components/Cart";
import PriceSummary from "@Components/PriceSummary";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.initApp());
  }, []);

  return (
    <div id="app">
      <h3 className="ui block center aligned header">Advertisy</h3>

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
