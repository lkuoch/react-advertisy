import React from "react";
import { get } from "lodash";

import { Product, ProductSelectionType } from "@Containers/Cart/models";
import type { ICart } from "@AppTypes";

interface IUserSelectionProps extends ICart.IProps {
  item: Product;
}

export default function UserSelection(props: IUserSelectionProps) {
  const id = props.item.id;
  const qty = get(props.customerSelections, [props.currentCustomer, id, "qty"], 0);

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
              props.handleProductSelection({
                id,
                type: ProductSelectionType.Decrement,
              })
            }
          >
            -
          </button>

          <div className="or" data-text="/" />

          <button
            className="ui positive basic button"
            onClick={() =>
              props.handleProductSelection({
                id,
                type: ProductSelectionType.Increment,
              })
            }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
