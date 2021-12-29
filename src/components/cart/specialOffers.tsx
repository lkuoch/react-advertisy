import React from "react";
import { useAtomValue } from "jotai/utils";
import { Box, Text } from "@chakra-ui/react";

import { OfferType } from "../../features/customer/types";
import { customerProductOfferAtom } from "../../features/customer/atoms";

import type { Product } from "../../features/cart/types";

interface Props {
  product: Product;
}

const SpecialOffers = ({ product: { id: productId, retailPrice } }: Props) => {
  const newPriceOffer = useAtomValue(customerProductOfferAtom({ productId, offerType: OfferType.NewPrice }));
  const xyDealOffer = useAtomValue(customerProductOfferAtom({ productId, offerType: OfferType.XYDeal }));

  const hasOffers = newPriceOffer.length > 0 || xyDealOffer.length > 0;

  return (
    <Box>
      {hasOffers && (
        <>
          <Text color="tomato" fontSize="lg" fontWeight={"extrabold"} p={2}>
            SPECIAL OFFER:
          </Text>

          <>
            {newPriceOffer.length > 0 && (
              <Text
                as="i"
                color="gray.700"
                pl={4}
              >{`We have slashed the price from $${retailPrice} -> $${newPriceOffer[0]}`}</Text>
            )}

            {xyDealOffer.length > 0 && (
              <Text as="i" color="gray.700" pl={4}>{`Buy ${xyDealOffer[0]} for the price of ${xyDealOffer[1]}`}</Text>
            )}
          </>
        </>
      )}
    </Box>
  );
};

export default SpecialOffers;
