import * as React from "react";

import Loader from "@components/common/loader";
import Customers from "./customers";
import { Customer } from "@features/customer/types";

const Customer = () => {
  return (
    <div id="customers" className="left-panel ui vertical menu">
      <h2 className="title ui header">
        <i className="ui user outline icon" />
        <div className="content">Customers</div>

        <React.Suspense fallback={<Loader />}>
          <Customers />
        </React.Suspense>
      </h2>
    </div>
  );
};

export default Customer;
