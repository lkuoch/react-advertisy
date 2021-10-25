import React from "react";

import { Product } from "@Core/Cart/models";
import { Offer, OfferType } from "@Core/Customer/models";

interface ISpecialOfferProps {
  offer: Offer;
  original: Product;
}

export default function PriceSpecialOffer(props: ISpecialOfferProps) {
  const offerType = props.offer.type as OfferType;

  switch (offerType) {
    case OfferType.XYDeal: {
      const [x, y] = props.offer.values;

      return (
        <span className="special-offer ui blue text">{`Buy ${x} for the price of ${y}`}</span>
      );
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
