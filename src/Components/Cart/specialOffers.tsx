import React from "react";
import { useSelector } from "react-redux";

import { selectors as customerSelectors } from "@features/customer/state";

import type { Product } from "@features/cart/types";

interface Props {
  product: Product;
}

const SpecialOffers = ({ product: { id, RetailPrice } }: Props) => {
  const newPriceOffer = useSelector((state) => customerSelectors.selectNewPriceOffer(state, id));
  const xyDealOffer = useSelector((state) => customerSelectors.selectXYDealOffer(state, id));

  const hasOffers = !!newPriceOffer || !!xyDealOffer;

  return (
    <>
      {hasOffers && (
        <div className="special-offer-section">
          <p>
            <span className="special-offer-title ui red text">SPECIAL OFFER:</span>
          </p>

          <ul>
            {newPriceOffer && (
              <li>
                <span className="special-offer ui blue text">{`We have slashed the price from ${RetailPrice} -> ${newPriceOffer[0]}`}</span>
              </li>
            )}

            {xyDealOffer && (
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
