import React from "react";
import { useAtomValue } from "jotai";
import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";

import { ProductOfferAtom } from "../../features/customer/atoms";

import { Product, ProductOfferType } from "../../schema/generated";

interface Props {
  product: Product;
}

export default ({ product: { id: productId, price } }: Props) => {
  const textColor = useColorModeValue("gray.700", "white");
  const newPriceOffer = useAtomValue(ProductOfferAtom({ productId, offerType: ProductOfferType.NewPrice }));
  const xyDealOffer = useAtomValue(ProductOfferAtom({ productId, offerType: ProductOfferType.XyDeal }));

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
              >{`We have slashed the price from $${price} -> $${newPriceOffer[0]}`}</Text>
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
