import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions as customerActions, selectors as customerSelectors } from "@Core/Customer/redux";

import { Product } from "@Core/Cart/models";

interface IUserSelectionProps {
  item: Product;
}

export default function UserSelection({ item: { id } }: IUserSelectionProps) {
  const dispatch = useDispatch();
  const qty = useSelector(customerSelectors.selectProductQuantity(id));

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
