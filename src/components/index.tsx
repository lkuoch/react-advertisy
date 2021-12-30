import * as React from "react";
import { Box, VStack, useColorModeValue, useDisclosure } from "@chakra-ui/react";

import Navbar from "./common/navbar";
import CustomerSection from "./customer";
import CartSection from "./cart";
import PriceSummarySection from "./priceSummary";

export default () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box maxWidth="100vw" bg={useColorModeValue("gray.50", "gray.900")}>
      <CustomerSection isOpen={isOpen} onClose={onClose} />
      <Navbar onOpen={onOpen} />

      <VStack ml={{ base: 0, md: 60 }} p={4} spacing={{ base: "6" }}>
        <CartSection />
        <PriceSummarySection />
      </VStack>
    </Box>
  );
};
