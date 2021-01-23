import React from "react";
import { get } from "lodash";
import { useSelector } from "react-redux";

import { selectors as customerSelectors } from "@Core/Customer/redux";
import { Product } from "@Core/Cart/models";

interface IPriceProps {
  item: Product;
}

export default function Price(props: IPriceProps) {
  const customerSelections = useSelector(customerSelectors.selectCustomerSelections);
  const currentCustomer = useSelector(customerSelectors.selectCurrentCustomer);
  const customerPrice = get(customerSelections, [currentCustomer, props.item.id, "customerPrice"], null);
  const retailPrice = props.item.RetailPrice;

  return (
    <div className="price">
      {!!customerPrice ? (
        <div className="ui message teal center aligned">${customerPrice}</div>
      ) : (
        <div className="ui message center aligned">${retailPrice}</div>
      )}
    </div>
  );
}
