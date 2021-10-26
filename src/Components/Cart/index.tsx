import React from "react";
import { useSelector } from "react-redux";

import { selectors as customerSelectors } from "@Core/Customer/redux";
import Loader from "@Components/Common/Loader";
import Table from "./table";

export default function Cart() {
  const { hasLoaded } = useSelector(customerSelectors.selectSliceState);

  return (
    <div id="cart">
      <div className="center-panel ui segment">
        <h2 className="title ui header">
          <i className="ui store icon" />
          <div className="content">My Cart</div>
        </h2>

        {hasLoaded ? <Table /> : <Loader />}
      </div>
    </div>
  );
}
