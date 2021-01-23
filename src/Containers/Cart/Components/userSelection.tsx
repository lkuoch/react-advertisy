import React from "react";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { selectors as customerSelectors } from "@Containers/Customer/redux";
import { actions } from "@Containers/Cart/redux";
import { Product, ProductSelectionType } from "@Containers/Cart/models";

interface IUserSelectionProps {
  item: Product;
}

export default function UserSelection(props: IUserSelectionProps) {
  const dispatch = useDispatch();
  const customerSelections = useSelector(customerSelectors.selectCustomerSelections);
  const currentCustomer = useSelector(customerSelectors.selectCurrentCustomer);

  const id = props.item.id;
  const qty = get(customerSelections, [currentCustomer, id, "qty"], 0);

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
