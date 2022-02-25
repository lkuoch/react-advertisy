import React from "react";
import { useSelector } from "react-redux";
import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";

import { selectors } from "../../features/customer";

import { Product, ProductOfferType } from "../../types";

interface Props {
  product: Product;
}

export default ({ product: { id: productId, price } }: Props) => {
  const xyDealOffer = useSelector(selectors.selectProductOffer({ productId, offerType: ProductOfferType.XyDeal }));
  const newPriceOffer = useSelector(selectors.selectProductOffer({ productId, offerType: ProductOfferType.NewPrice }));

  const textColor = useColorModeValue("gray.700", "white");

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
