import React from "react";

import { Product } from "@Containers/Cart/models";
import { Offer, ProductDiscountType } from "@Containers/Customer/models";

interface ISpecialOfferProps {
  offer: Offer;
  original: Product;
}

export default function SpecialOffer(props: ISpecialOfferProps) {
  const offerType = props.offer.type as ProductDiscountType;

  switch (offerType) {
    case ProductDiscountType.XYDeal: {
      const [x, y] = props.offer.values;

      return <span className="special-offer ui blue text">{`Buy ${x} for the price of ${y}`}</span>;
    }

    case ProductDiscountType.NewPrice: {
      const [newPrice] = props.offer.values;

      return (
        <span className="special-offer ui blue text">{`We have slashed the price from ${props.original.RetailPrice} -> ${newPrice}`}</span>
      );
    }

    default:
      return null;
  }
}
