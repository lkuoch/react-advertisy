import * as React from "react";
import { SetStateAction, useAtom } from "jotai";
import { useAtomValue } from "jotai/utils";

import { currentCustomerAtom, customerSelectionsFamily } from "@features/customer/atoms";

import type { Product } from "@features/cart/types";
import { CustomerSelectionAtom } from "@features/customer/types";

interface Props {
  product: Product;
}

const UserSelection = ({ product: { id: productId } }: Props) => {
  const customerId = useAtomValue(currentCustomerAtom);
  const [selection, setSelection]: [CustomerSelectionAtom, (update: SetStateAction<CustomerSelectionAtom>) => void] =
    useAtom(customerSelectionsFamily({ customerId, productId }));

  const handleSelection = (type: "add" | "remove") => {
    switch (type) {
      case "add": {
        setSelection({
          ...selection,
          qty: selection.qty + 1,
        });
        break;
      }

      case "remove": {
        if (selection?.qty > 0) {
          setSelection({
            ...selection,
            qty: selection.qty - 1,
          });
        }
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <div className="number-input ui form">
      <div className="fields">
        <div className="five wide field">
          <input readOnly type="text" value={selection.qty} name="quantity" />
        </div>

        <div className="ui buttons">
          <button className="ui negative basic button" onClick={() => handleSelection("remove")}>
            -
          </button>

          <div className="or" data-text="/" />

          <button className="ui positive basic button" onClick={() => handleSelection("add")}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
