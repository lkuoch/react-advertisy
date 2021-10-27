import React from "react";

import { Offer, OfferType } from "@features/customer/types";
import type { Product } from "@features/cart/types";

interface Props {
  offer: Offer;
  original: Product;
}

export default function PriceSpecialOffer(props: Props) {
  const offerType = props.offer.type as OfferType;

  switch (offerType) {
    case OfferType.XYDeal: {
      const [x, y] = props.offer.values;

      return <span className="special-offer ui blue text">{`Buy ${x} for the price of ${y}`}</span>;
    }

    case OfferType.NewPrice: {
      const [newPrice] = props.offer.values;

      return (
        <span className="special-offer ui blue text">{`We have slashed the price from ${props.original.RetailPrice} -> ${newPrice}`}</span>
      );
    }

    default:
      return null;
  }
}
