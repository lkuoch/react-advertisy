import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions, selectors } from "@features/customer/state";
import { customerApi } from "@features/customer/api";

import Loader from "@components/common/Loader";

const Customer = () => {
  const dispatch = useDispatch();
  const { isError, isLoading, isSuccess } = customerApi.useFetchCustomersQuery();

  const entities = useSelector(selectors.adapter.selectAll);
  const currentCustomerId = useSelector(selectors.selectCurrentCustomerId);

  return (
    <div id="customers" className="left-panel ui vertical menu">
      <h2 className="title ui header">
        <i className="ui user outline icon" />
        <div className="content">Customers</div>
      </h2>

      {isError && <h1>ERROR</h1>}
      {isLoading && <Loader />}

      {isSuccess &&
        entities.map(({ id, name: Name }) => (
          <a
            key={id}
            className={`item ${id === currentCustomerId ? "red active" : ""}`}
            onClick={() => (id !== currentCustomerId ? dispatch(actions.updateCurrentCustomerId(id)) : null)}
          >
            {Name}
          </a>
        ))}
    </div>
  );
};

export default Customer;
