import * as React from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  FormControl,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

import { currentCustomerIdAtom, customerSelectionsAtom } from "../../features/customer/atoms";

import type { Product } from "../../schema/generated";

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
