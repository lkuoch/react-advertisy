import React from "react";
import cc from "classcat";

import Header from "./header";
import type { ICustomer } from "@AppTypes";

export default function Customer(props: ICustomer.IProps) {
  return (
    <div id="customers" className="left-panel ui vertical menu">
      <Header />

      {props.customers.map((x) => (
        <a
          key={x.id}
          className={cc({
            "red active": x.id === props.currentCustomer,
            item: true,
          })}
          onClick={() => (props.currentCustomer !== x.id ? props.updateCurrentCustomer(x.id) : null)}
        >
          {x.Name}
        </a>
      ))}
    </div>
  );
}
