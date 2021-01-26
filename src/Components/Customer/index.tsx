import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./header";
import { actions, selectors } from "@Core/Customer/redux";

export default function Customer() {
  const dispatch = useDispatch();
  const state = useSelector(selectors.selectCustomersState);
  const currentCustomer = useSelector(selectors.selectCurrentCustomer);

  return (
    <div id="customers" className="left-panel ui vertical menu">
      <Header />

      {state.ids.map((x) => (
        <a
          key={x}
          className={`item ${x === currentCustomer ? "red active" : ""}`}
          onClick={() =>
            currentCustomer !== x
              ? dispatch(actions.updateCurrentCustomer(x as number))
              : null
          }
        >
          {state.entities[x as number].Name}
        </a>
      ))}
    </div>
  );
}
