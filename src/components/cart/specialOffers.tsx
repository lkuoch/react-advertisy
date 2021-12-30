import React from "react";
import { useAtomValue } from "jotai/utils";
import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";

import { OfferType } from "../../features/customer/types";
import { customerProductOfferAtom } from "../../features/customer/atoms";

import type { Product } from "../../features/cart/types";

interface Props {
  product: Product;
}

export default ({ product: { id: productId, retailPrice } }: Props) => {
  const textColor = useColorModeValue("gray.700", "white");
  const newPriceOffer = useAtomValue(customerProductOfferAtom({ productId, offerType: OfferType.NewPrice }));
  const xyDealOffer = useAtomValue(customerProductOfferAtom({ productId, offerType: OfferType.XYDeal }));

  const hasOffers = newPriceOffer.length > 0 || xyDealOffer.length > 0;

  return (
    <Box>
      {hasOffers && (
        <Box border="1px" borderColor="teal.300" borderRadius="lg" borderWidth="2px" mt={2} p={2}>
          <HStack>
            <Text color="tomato" fontSize="lg" fontWeight={"extrabold"}>
              SPECIAL OFFER:
            </Text>
            <Text>🎉</Text>
          </HStack>

          <>
            {newPriceOffer.length > 0 && (
              <Text
                as="i"
                color={textColor}
                pl={4}
              >{`We have slashed the price from $${retailPrice} -> $${newPriceOffer[0]}`}</Text>
            )}

            {xyDealOffer.length > 0 && (
              <Text as="i" color={textColor} pl={4}>{`Buy ${xyDealOffer[0]} for the price of ${xyDealOffer[1]}`}</Text>
            )}
          </>
        </Box>
      )}
    </Box>
  );
};
