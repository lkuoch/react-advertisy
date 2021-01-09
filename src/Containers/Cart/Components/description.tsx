import React from "react";
import { get } from "lodash";

import SpecialOffer from "@Components/specialOffer";
import { Product } from "@Containers/Cart/models";
import type { ICart } from "@AppTypes";
import { Offer } from "@Containers/Customer/models";

interface IDescriptionProps extends ICart.IProps {
  item: Product;
}

export default function Description(props: IDescriptionProps) {
  const availableOffers = get(props.currentOffers, [props.item.id], []);

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
