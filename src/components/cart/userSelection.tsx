import * as React from "react";
import { useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";

import { currentCustomerAtom, customerSelectionsReducerAtom, selectCustomerSelections } from "@features/customer/atoms";

import type { Product } from "@features/cart/types";

interface Props {
  product: Product;
}

const UserSelection = ({ product: { id: productId } }: Props) => {
  const customerId = useAtomValue(currentCustomerAtom);
  const dispatch = useUpdateAtom(customerSelectionsReducerAtom);
  const selections = useAtomValue(selectCustomerSelections(customerId, productId));

  const qty = 0;

  console.log("@", selections);

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
              dispatch({
                type: "remove",
                payload: {
                  customerId,
                  productId: productId,
                },
              })
            }
          >
            -
          </button>

          <div className="or" data-text="/" />

          <button
            className="ui positive basic button"
            onClick={() =>
              dispatch({
                type: "add",
                payload: {
                  customerId,
                  productId: productId,
                },
              })
            }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
