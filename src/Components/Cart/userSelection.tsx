import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  actions as customerActions,
  selectors as customerSelectors,
} from "@Core/Customer/redux";

import { Product } from "@Core/Cart/models";

interface Props {
  product: Product;
}

export default function UserSelection({ product: { id } }: Props) {
  const dispatch = useDispatch();
  const qty = useSelector(customerSelectors.selectCurrentProductQuantity(id));

  return (
    <div className="number-input ui form">
      <div className="fields">
        <div className="five wide field">
          <input readOnly type="text" value={qty} name="quantity" />
        </div>

        <div className="ui buttons">
          <button
            className="ui negative basic button"
            onClick={() =>
              dispatch(
                customerActions.removeFromCart({
                  productId: id,
                  qty,
                })
              )
            }
          >
            -
          </button>

          <div className="or" data-text="/" />

          <button
            className="ui positive basic button"
            onClick={() =>
              dispatch(
                customerActions.addToCart({
                  productId: id,
                  qty,
                })
              )
            }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
