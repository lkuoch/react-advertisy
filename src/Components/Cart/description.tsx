import React from "react";
import { useSelector } from "react-redux";

import { selectors as customerSelectors } from "@features/customer/redux";

import PriceSpecialOffer from "@components/shared/priceSpecialOffer";
import type { Product } from "@features/cart/types";

interface Props {
  product: Product;
}

export default function Description({ product }: Props) {
  const { hasOffers, offers } = useSelector((state) => customerSelectors.selectCurrentOffers(state, product.id));

  return (
    <div className="description">
      <p>{product.Description}</p>

      {hasOffers && (
        <div className="special-offer-section">
          <p>
            <span className="special-offer-title ui red text">SPECIAL OFFER:</span>
          </p>

          <ul>
            {offers.map((offer) => (
              <li key={offer.type}>
                <PriceSpecialOffer offer={offer} original={product} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
