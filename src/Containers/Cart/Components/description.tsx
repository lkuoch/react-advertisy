import React from "react";
import { get } from "lodash";
import { useSelector } from "react-redux";

import { selectors as customerSelectors } from "@Containers/Customer/redux";

import SpecialOffer from "@Components/specialOffer";
import { Product } from "@Containers/Cart/models";
import { Offer } from "@Containers/Customer/models";

interface IDescriptionProps {
  item: Product;
}

export default function Description(props: IDescriptionProps) {
  const currentOffers = useSelector(customerSelectors.selectCurrentOffers);
  const availableOffers = get(currentOffers, [props.item.id], []);

  return (
    <div className="description">
      <p>{props.item.Description}</p>

      {availableOffers.length > 0 && (
        <div className="special-offer-section">
          <p>
            <span className="special-offer-title ui red text">SPECIAL OFFER:</span>
          </p>

          <ul>
            {(availableOffers as Offer[]).map((x, i) => (
              <li key={i}>
                <SpecialOffer offer={x} original={props.item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
