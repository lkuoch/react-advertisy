import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cc from "classcat";

import Header from "./header";
import { actions, selectors } from "@Containers/Customer/redux";

export default function Customer() {
  const dispatch = useDispatch();
  const customers = useSelector(selectors.selectCustomers);
  const currentCustomer = useSelector(selectors.selectCurrentCustomer);

  return (
    <div id="customers" className="left-panel ui vertical menu">
      <Header />

      {customers.map((x) => (
        <a
          key={x.id}
          className={cc({
            "red active": x.id === currentCustomer,
            item: true,
          })}
          onClick={() => (currentCustomer !== x.id ? dispatch(actions.updateCurrentCustomer(x.id)) : null)}
        >
          {x.Name}
        </a>
      ))}
    </div>
  );
}
