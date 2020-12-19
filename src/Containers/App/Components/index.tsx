import React, { useEffect } from "react";

import Header from "./header";
import CustomerContainer from "@Containers/Customer";
import CartContainer from "@Containers/Cart";
import PriceSummaryContainer from "@Containers/PriceSummary";
import type { IApp } from "@AppTypes";

export default function App(props: IApp.IProps) {
  useEffect(() => {
    props.initApp();
  }, []);

  return (
    <div id="app">
      <Header title={props.appConfig.translation.appTitle} />

      <div id="content">
        <CustomerContainer />

        <div id="checkout">
          <CartContainer />
          <PriceSummaryContainer />
        </div>
      </div>
    </div>
  );
}
