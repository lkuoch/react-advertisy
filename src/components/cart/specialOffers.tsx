import React from "react";
import { useAtomValue } from "jotai/utils";

import type { Product } from "@features/cart/types";
import { OfferType } from "@features/customer/types";
import { customerProductOffersAtom } from "@features/customer/atoms";

interface Props {
  product: Product;
}

const SpecialOffers = ({ product: { id: productId, retailPrice } }: Props) => {
  const newPriceOffer = useAtomValue(customerProductOffersAtom)(productId, OfferType.NewPrice);
  const xyDealOffer = useAtomValue(customerProductOffersAtom)(productId, OfferType.XYDeal);

  const hasOffers = newPriceOffer.length > 0 || xyDealOffer.length > 0;

  return (
    <>
      {hasOffers && (
        <div className="special-offer-section">
          <p>
            <span className="special-offer-title ui red text">SPECIAL OFFER:</span>
          </p>

          <ul>
            {newPriceOffer.length > 0 && (
              <li>
                <span className="special-offer ui blue text">{`We have slashed the price from ${retailPrice} -> ${newPriceOffer[0]}`}</span>
              </li>
            )}

            {xyDealOffer.length > 0 && (
              <li>
                <span className="special-offer ui blue text">{`Buy ${xyDealOffer[0]} for the price of ${xyDealOffer[1]}`}</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default SpecialOffers;
