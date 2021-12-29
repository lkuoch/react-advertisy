import React from "react";
import { useAtomValue } from "jotai/utils";

import { Flex, Text } from "@chakra-ui/react";

import { customerProductOfferAtom } from "../../features/customer/atoms";
import { OfferType } from "../../features/customer/types";
import type { Product } from "../../features/cart/types";

interface Props {
  product: Product;
}

const Price = ({ product: { retailPrice, id: productId } }: Props) => {
  const { length, [0]: newPriceOffer } = useAtomValue(
    customerProductOfferAtom({ productId, offerType: OfferType.NewPrice })
  );

  if (length > 0) {
    return (
      <Flex direction="row">
        <Text color="firebrick">${newPriceOffer}</Text>
        <Text pl={2}>🔥</Text>
      </Flex>
    );
  }

  return <Text>${retailPrice}</Text>;
};

export default Price;
