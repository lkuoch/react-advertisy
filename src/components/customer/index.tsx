import * as React from "react";
import { Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";

import Customers from "./customers";

const CustomerSection = () => {
  const { isOpen, onClose } = useDisclosure();

  return (
    <>
      <Customers onClose={() => onClose} display={{ base: "none", md: "block" }} />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Customers onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CustomerSection;
