import React from "react";
import { useSelector } from "react-redux";

import { HStack, Text, useColorModeValue } from "@chakra-ui/react";

import { selectors } from "../../features/customer";
import { Product, ProductOfferType } from "../../types";

interface Props {
  product: Product;
}

export default ({ product: { price, id: productId } }: Props) => {
  const newPriceColor = useColorModeValue("firebrick", "tomato");
  const { length, [0]: newPriceOffer } = useSelector(
    selectors.selectProductOffer({ productId, offerType: ProductOfferType.NewPrice })
  );

  if (length > 0) {
    return (
      <HStack spacing={2}>
        <Text color={newPriceColor}>${newPriceOffer}</Text>
        <Text>🔥</Text>
      </HStack>
    );
  }

  return (
    <HStack>
      <Text>${price}</Text>
    </HStack>
  );
};
