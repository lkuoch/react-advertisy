import React from "react";
import { useSelector } from "react-redux";

import { selectors as customerSelectors } from "@Core/Customer/redux";

import PriceSpecialOffer from "@Components/Shared/priceSpecialOffer";
import type { Product } from "@Core/Cart/models";

interface Props {
  item: Product;
}

export default function Description({ item }: Props) {
  const { hasOffers, offers } = useSelector(customerSelectors.selectCurrentOffers(item.id));

  return (
    <div className="description">
      <p>{item.Description}</p>

      {hasOffers && (
        <div className="special-offer-section">
          <p>
            <span className="special-offer-title ui red text">SPECIAL OFFER:</span>
          </p>

          <ul>
            {offers.map((offer) => (
              <li key={offer.type}>
                <PriceSpecialOffer offer={offer} original={item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
