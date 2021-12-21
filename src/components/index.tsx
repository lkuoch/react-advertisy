import * as React from "react";

import Customer from "./customer";
import Cart from "./cart";
import PriceSummary from "./priceSummary";

export const App = () => {
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
};

export default App;
