import * as React from "react";
import { Center, CircularProgress } from "@chakra-ui/react";

export default () => {
  return (
    <Center h="50%">
      <CircularProgress isIndeterminate color="gray.400" />
    </Center>
  );
};
