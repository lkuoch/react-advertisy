import React from "react";
import { useSelector } from "react-redux";

import { selectors as customerSelectors } from "@features/customer/state";
import { OfferType } from "@features/customer/types";
import type { Product } from "@features/cart/types";

interface Props {
  product: Product;
}

const Price = ({ product }: Props) => {
  const [customerPrice] = useSelector((state) =>
    customerSelectors.selectCurrentProductOffer(state, {
      offerType: OfferType.NewPrice,
      productId: product.id,
    })
  );

  return (
    <div className="price">
      {customerPrice == null ? (
        <div className="ui message center aligned">${product.RetailPrice}</div>
      ) : (
        <div className="ui message teal center aligned">${customerPrice}</div>
      )}
    </div>
  );
};

export default Price;
