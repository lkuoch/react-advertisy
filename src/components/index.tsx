import * as React from "react";

import Customer from "./customer";
import Cart from "./cart";
import PriceSummary from "./priceSummary";

export const App = () => {
  return (
    <div className="relative bg-white">
      <div className="flex flex-row align-middle justify-center p-4">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate underline">Advertisy</h2>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-row flex-wrap py-4">
          <Customer />

          <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
            <Cart />
            <PriceSummary />
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;

{
  /* <h3 className="ui block center aligned header">Advertisy</h3>

<div id="content">
  <Customer />

  <div id="checkout">
    <Cart />
    <PriceSummary />
  </div>
</div> */
}
