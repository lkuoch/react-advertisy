import * as React from "react";
import { Box, BoxProps, CloseButton, Flex, Text, useColorModeValue } from "@chakra-ui/react";

import Loader from "../common/loader";
import CustomerList from "./customerList";

interface Props extends BoxProps {
  onClose: () => void;
}

export default ({ onClose, ...rest }: Props) => {
  return (
    <Box
      transition="3s ease"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Customers
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <React.Suspense fallback={<Loader />}>
        <CustomerList onClose={onClose} />
      </React.Suspense>
    </Box>
  );
};
