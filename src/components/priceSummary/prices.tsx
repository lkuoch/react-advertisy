import React from "react";
import { useSelector } from "react-redux";

import { Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";

import { selectors } from "../../features/priceSummary";

export default () => {
  const basePrice = useSelector(selectors.selectBasePrice);
  const basePriceColor = useColorModeValue("gray.700", "gray.100");

  const discountPrice = useSelector(selectors.selectDiscountedPrice);

  const finalPrice = useSelector(selectors.selectFinalPrice);
  const finalPriceColor = useColorModeValue("blue.700", "blue.500");

  return (
    <Flex alignItems="flex-end" flexDirection="column" w="100%">
      <Text color={basePriceColor} fontSize="xl" fontWeight="bold">
        {`Item Totals: $${basePrice.toFixed(2)}`}
      </Text>

      {discountPrice > 0 && (
        <>
          <Text as="u" fontSize="xl" fontWeight="bold" color="tomato">{`- Your Savings: $${discountPrice.toFixed(
            2
          )}`}</Text>

          <HStack>
            <Text fontSize="2xl">💸</Text>
            <Text color={finalPriceColor} fontSize="2xl" fontWeight="extrabold">{`Final Price: $${finalPrice.toFixed(
              2
            )}`}</Text>
          </HStack>
        </>
      )}
    </Flex>
  );
};
