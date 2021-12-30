import * as React from "react";
import { Drawer, DrawerContent } from "@chakra-ui/react";

import Customers from "./customers";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerSection = ({ isOpen, onClose }: Props) => {
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
