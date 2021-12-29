import React from "react";

import SpecialOffers from "./specialOffers";
import type { Product } from "../../features/cart/types";
import { Box, Text } from "@chakra-ui/react";

interface Props {
  product: Product;
}

const Description = ({ product }: Props) => {
  return (
    <Box>
      <Text>{product.description}</Text>
      <SpecialOffers product={product} />
    </Box>
  );
};

export default Description;
