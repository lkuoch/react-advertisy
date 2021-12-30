import React from "react";

import { useAtomValue } from "jotai/utils";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

import { basePriceAtom, discountedPriceAtom, finalPriceAtom } from "../../features/priceSummary/atoms";

const PriceSummary = () => {
  const basePrice = useAtomValue(basePriceAtom);
  const discountPrice = useAtomValue(discountedPriceAtom);
  const finalPrice = useAtomValue(finalPriceAtom);

  return (
    <Flex alignItems="flex-end" flexDirection="column" w="100%">
      <Text color="gray.700" fontSize="xl" fontWeight="bold">
        {`Item Totals: $${basePrice.toFixed(2)}`}
      </Text>

      {discountPrice > 0 && (
        <>
          <Text as="u" fontSize="xl" fontWeight="bold" color="tomato">{`- Your Savings: $${discountPrice.toFixed(
            2
          )}`}</Text>

          <Text color="blue.700" fontSize="2xl" fontWeight="extrabold">{`💸 Final Price: $${finalPrice.toFixed(
            2
          )} `}</Text>
        </>
      )}
    </Flex>
  );
};

export default PriceSummary;
