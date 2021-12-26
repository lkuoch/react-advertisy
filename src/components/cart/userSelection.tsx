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

        <div className="flex flex-row justify-center">
          <button
            type="button"
            className="border border-red-500 text-red-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-red-600 focus:outline-none focus:shadow-outline"
            onClick={() => setSelection("remove")}
          >
            -
          </button>

          <button
            type="button"
            className="border border-green-500 text-green-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-green-600 focus:outline-none focus:shadow-outline"
            onClick={() => setSelection("add")}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
