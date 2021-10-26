import React from "react";
import { useSelector } from "react-redux";

import { selectors as customerSelectors } from "@Core/Customer/redux";
import { Product } from "@Core/Cart/models";
import { OfferType } from "@Core/Customer/models";

interface Props {
  product: Product;
}

export default function Price({ product }: Props) {
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
}
