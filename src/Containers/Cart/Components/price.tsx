import React from "react";
import { get } from "lodash";

import { Product } from "@Containers/Cart/models";
import type { ICart } from "@AppTypes";

interface IPriceProps extends ICart.IProps {
  item: Product;
}

export default function Price(props: IPriceProps) {
  const customerPrice = get(
    props.customerSelections,
    [props.currentCustomer, props.item.id, "customerPrice"],
    null
  );
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
