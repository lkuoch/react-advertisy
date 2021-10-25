import React from "react";
import { useSelector } from "react-redux";

import { selectors as customerSelectors } from "@Core/Customer/redux";
import Table from "./table";

export default function Cart() {
  const customersLoaded = useSelector(customerSelectors.selectHasLoaded);

  const Loader = () => (
    <div className="ui segment" style={{ height: "25vh" }}>
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading</div>
      </div>
    </div>
  );

  return (
    <div id="cart">
      <div className="center-panel ui segment">
        <h2 className="title ui header">
          <i className="ui store icon" />
          <div className="content">My Cart</div>
        </h2>

        {!customersLoaded ? <Loader /> : <Table />}
      </div>
    </div>
  );
}
