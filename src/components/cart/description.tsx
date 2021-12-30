import React from "react";

import SpecialOffers from "./specialOffers";
import type { Product } from "../../features/cart/types";
import { Text, VStack } from "@chakra-ui/react";

interface Props {
  product: Product;
}

export default ({ product }: Props) => {
  return (
    <VStack align="start">
      <Text>{product.description}</Text>
      <SpecialOffers product={product} />
    </VStack>
  );
};
