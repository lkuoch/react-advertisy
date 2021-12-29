import React from "react";

import { useAtomValue } from "jotai/utils";
import { Divider, Text, VStack } from "@chakra-ui/react";

import { basePriceAtom, discountedPriceAtom, finalPriceAtom } from "../../features/priceSummary/atoms";

const PriceSummary = () => {
  const basePrice = useAtomValue(basePriceAtom);
  const discountPrice = useAtomValue(discountedPriceAtom);
  const finalPrice = useAtomValue(finalPriceAtom);

  return (
    <VStack>
      <Text color="gray.700" fontSize="xl" fontWeight="bold">
        {`Item Totals: $${basePrice.toFixed(2)}`}
      </Text>

      {discountPrice > 0 && (
        <>
          <Divider />
          <Text fontSize="xl" fontWeight="bold" color="tomato">{`Your Savings: $${discountPrice.toFixed(2)}`}</Text>

          <Divider />
          <Text color="blue.700" fontSize="2xl" fontWeight="extrabold">{`Final Price: $${finalPrice.toFixed(
            2
          )} 💸`}</Text>
        </>
      )}
    </VStack>
  );
};

export default PriceSummary;
