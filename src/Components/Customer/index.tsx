import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions, selectors } from "@Core/Customer/redux";
import { customerApi } from "@Core/Customer/api";

export default function Customer() {
  const dispatch = useDispatch();
  const [fetchCustomers] = customerApi.useLazyFetchCustomersQuery();
  const hasLoaded = useSelector(selectors.selectHasLoaded);
  const entities = useSelector(selectors.selectAll);
  const currentCustomerId = useSelector(selectors.selectCurrentCustomerId);

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div id="customers" className="left-panel ui vertical menu">
      <h2 className="title ui header">
        <i className="ui user outline icon" />
        <div className="content">Customers</div>
      </h2>

      {!hasLoaded ? (
        <div className="ui segment" style={{ height: "100%" }}>
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </div>
      ) : (
        <>
          {entities.map(({ id, Name }) => (
            <a
              key={id}
              className={`item ${id === currentCustomerId ? "red active" : ""}`}
              onClick={() => (id !== currentCustomerId ? dispatch(actions.updateCurrentCustomerId(id)) : null)}
            >
              {Name}
            </a>
          ))}
        </>
      )}
    </div>
  );
}
