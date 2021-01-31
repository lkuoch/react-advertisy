import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./header";
import { actions, selectors } from "@Core/Customer/redux";

export default function Customer() {
  const dispatch = useDispatch();
  const { ids, entities } = useSelector(selectors.selectAdapted);
  const { current } = useSelector(selectors.selectState);

  return (
    <div id="customers" className="left-panel ui vertical menu">
      <Header />

      {ids.map((x) => (
        <a
          key={x}
          className={`item ${x === current ? "red active" : ""}`}
          onClick={() =>
            current !== x
              ? dispatch(actions.updateCurrentCustomer(x as number))
              : null
          }
        >
          {entities[x]!.Name}
        </a>
      ))}
    </div>
  );
}
