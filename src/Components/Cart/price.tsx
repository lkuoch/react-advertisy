import React from "react";
import { useSelector } from "react-redux";

import { selectors as customerSelectors } from "@Core/Customer/redux";
import { Product } from "@Core/Cart/models";
import { OfferType } from "@Core/Customer/models";

interface Props {
  item: Product;
}

export default function Price({ item }: Props) {
  const [customerPrice] = useSelector(
    customerSelectors.selectGetCurrentOffer({ offerType: OfferType.NewPrice, productId: item.id })
  );

  return (
    <div className="price">
      {customerPrice == null ? (
        <div className="ui message center aligned">${item.RetailPrice}</div>
      ) : (
        <div className="ui message teal center aligned">${customerPrice}</div>
      )}
    </div>
  );
}
