import React from "react";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { selectors as customerSelectors } from "@Core/Customer/redux";
import { actions } from "@Core/Cart/redux";
import { Product, ProductSelectionType } from "@Core/Cart/models";

interface IUserSelectionProps {
  item: Product;
}

export default function UserSelection(props: IUserSelectionProps) {
  const dispatch = useDispatch();
  const { selections, current } = useSelector(customerSelectors.selectState);

  const id = props.item.id;
  const qty = get(selections, [current, id, "qty"], 0);

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
                actions.handleProductSelection({
                  id,
                  type: ProductSelectionType.Decrement,
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
                actions.handleProductSelection({
                  id,
                  type: ProductSelectionType.Increment,
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