import React from "react";
import { useAtomValue } from "jotai";

import { HStack, Text, useColorModeValue } from "@chakra-ui/react";

import { ProductOfferAtom } from "../../features/customer/atoms";
import { Product, ProductOfferType } from "../../schema/generated";

interface Props {
  product: Product;
}

export default ({ product: { price, id: productId } }: Props) => {
  const newPriceColor = useColorModeValue("firebrick", "tomato");
  const { length, [0]: newPriceOffer } = useAtomValue(
    ProductOfferAtom({ productId, offerType: ProductOfferType.NewPrice })
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
