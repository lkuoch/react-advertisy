import React from "react";
import { useSelector } from "react-redux";

import { selectors as customerSelectors } from "@features/customer/state";
import type { Product } from "@features/cart/types";

interface Props {
  product: Product;
}

const Price = ({ product: { RetailPrice, id } }: Props) => {
  const customerPrice = useSelector((state) => customerSelectors.selectNewPriceOffer(state, id));

  console.log(customerSelectors.selectNewPriceOffer.recomputations());

  return (
    <div className="price">
      {customerPrice == null ? (
        <div className="ui message center aligned">${RetailPrice}</div>
      ) : (
        <div className="ui message teal center aligned">${customerPrice}</div>
      )}
    </div>
  );
};

export default Price;
