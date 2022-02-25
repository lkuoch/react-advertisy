import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

import { actions, selectors } from "../../features/customer";

import type { Product } from "../../types";

interface Props {
  product: Product;
}

export default ({ product: { id: productId } }: Props) => {
  const dispatch = useDispatch();

  const qty = useSelector(selectors.selectCurrentProductQty(productId));

  return (
    <FormControl>
      <NumberInput focusBorderColor="gray.500" value={qty}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper onClick={() => dispatch(actions.addToCart(productId))} />
          <NumberDecrementStepper onClick={() => dispatch(actions.removeFromCart(productId))} />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};
