import * as React from "react";
import { useAtom } from "jotai";
import { useAtomValue } from "jotai/utils";

import { currentCustomerIdAtom, customerSelectionsAtom } from "../../features/customer/atoms";

import type { Product } from "../../features/cart/types";

interface Props {
  product: Product;
}

const UserSelection = ({ product: { id: productId } }: Props) => {
  const customerId = useAtomValue(currentCustomerIdAtom);
  const [selection, setSelection] = useAtom(customerSelectionsAtom({ customerId, productId }));

  return (
    <div className="number-input ui form">
      <div className="fields">
        <div className="five wide field">
          <input readOnly type="text" value={selection?.qty} name="quantity" />
        </div>

        <div className="ui buttons">
          <button className="ui negative basic button" onClick={() => setSelection("remove")}>
            -
          </button>

          <div className="or" data-text="/" />

          <button className="ui positive basic button" onClick={() => setSelection("add")}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
