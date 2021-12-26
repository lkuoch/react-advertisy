import React from "react";
import { useAtomValue } from "jotai/utils";

import { customerProductOfferAtom } from "../../features/customer/atoms";
import { OfferType } from "../../features/customer/types";
import type { Product } from "../../features/cart/types";

interface Props {
  product: Product;
}

const Price = ({ product: { retailPrice, id: productId } }: Props) => {
  const { length, [0]: newPriceOffer } = useAtomValue(
    customerProductOfferAtom({ productId, offerType: OfferType.NewPrice })
  );

  return (
    <p className="text-left font-medium">
      {length > 0 ? <span className="text-teal-500">${newPriceOffer}</span> : <span>${retailPrice}</span>}
    </p>
  );
};

export default Price;
