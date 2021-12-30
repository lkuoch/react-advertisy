import React from "react";
import { useAtomValue } from "jotai/utils";

import { HStack, Text, useColorModeValue } from "@chakra-ui/react";

import { customerProductOfferAtom } from "../../features/customer/atoms";
import { OfferType } from "../../features/customer/types";
import type { Product } from "../../features/cart/types";

interface Props {
  product: Product;
}

const Price = ({ product: { retailPrice, id: productId } }: Props) => {
  const newPriceColor = useColorModeValue("firebrick", "tomato");
  const { length, [0]: newPriceOffer } = useAtomValue(
    customerProductOfferAtom({ productId, offerType: OfferType.NewPrice })
  );

  if (length > 0) {
    return (
      <HStack spacing={2}>
        <Text color={newPriceColor}>${newPriceOffer}</Text>
        <Text>🔥</Text>
      </HStack>
    );
  }

  return <Text>${retailPrice}</Text>;
};

export default Price;
