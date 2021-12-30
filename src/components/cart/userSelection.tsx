import * as React from "react";
import { useAtom } from "jotai";
import { useAtomValue } from "jotai/utils";
import {
  FormControl,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

import { currentCustomerIdAtom, customerSelectionsAtom } from "../../features/customer/atoms";

import type { Product } from "../../features/cart/types";

interface Props {
  product: Product;
}

export default ({ product: { id: productId } }: Props) => {
  const customerId = useAtomValue(currentCustomerIdAtom);
  const [selection, setSelection] = useAtom(customerSelectionsAtom({ customerId, productId }));

  return (
    <FormControl>
      <NumberInput focusBorderColor="gray.500" value={selection?.qty}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper onClick={() => setSelection("add")} />
          <NumberDecrementStepper onClick={() => setSelection("remove")} />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};
