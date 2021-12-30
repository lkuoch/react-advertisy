import { Center, CircularProgress } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <Center h="50%">
      <CircularProgress isIndeterminate color="gray.400" />
    </Center>
  );
};

export default Loader;
