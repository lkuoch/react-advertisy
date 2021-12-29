import * as React from "react";
import { Box, VStack, useColorModeValue } from "@chakra-ui/react";

import Navbar from "./common/navbar";
import CustomerSection from "./customer";
import CartSection from "./cart";
import PriceSummarySection from "./priceSummary";

export const App = () => {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <CustomerSection />
      <Navbar />

      <VStack ml={{ base: 0, md: 60 }} p="4" spacing={{ base: "6" }}>
        <CartSection />
        <PriceSummarySection />
      </VStack>
    </Box>
  );
};

export default App;
