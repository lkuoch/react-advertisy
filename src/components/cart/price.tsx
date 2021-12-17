import React from "react";
import { useAtomValue } from "jotai/utils";

import { selectCustomerProductOfferAtom } from "@features/customer/atoms";
import { OfferType } from "@features/customer/types";
import type { Product } from "@features/cart/types";

interface Props {
  product: Product;
}

const Price = ({ product: { retailPrice, id: productId } }: Props) => {
  const { length, [0]: newPriceOffer } = useAtomValue(selectCustomerProductOfferAtom)(productId, OfferType.NewPrice);

  return (
    <div className="price">
      {length > 0 ? (
        <div className="ui message teal center aligned">${newPriceOffer}</div>
      ) : (
        <div className="ui message center aligned">${retailPrice}</div>
      )}
    </div>
  );
};

export default Price;
