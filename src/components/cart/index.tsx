import * as React from "react";

import Table from "./table";
import Loader from "../common/loader";

const Cart = () => {
  return (
    <div id="cart">
      <div className="center-panel ui segment">
        <h2 className="title ui header">
          <i className="ui store icon" />
          <div className="content">My Cart</div>
        </h2>

        <React.Suspense fallback={<Loader />}>
          <Table />
        </React.Suspense>
      </div>
    </div>
  );
};

export default Cart;
