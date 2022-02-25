import React from "react";
import { Text, VStack } from "@chakra-ui/react";

import SpecialOffers from "./specialOffers";
import type { Product } from "../../types";

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
