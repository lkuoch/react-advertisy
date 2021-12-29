import * as React from "react";

import UserIcon from "@heroicons/react/outline/UserIcon";
import { Flex, Icon, Link, Text } from "@chakra-ui/react";

import { useAtom } from "jotai";
import { useAtomValue } from "jotai/utils";

import { currentCustomerIdAtom, customerQueryAtom } from "../../features/customer/atoms";

interface Props {
  onClose: () => void;
}

const Customers = ({ onClose }: Props) => {
  const customers = useAtomValue(customerQueryAtom);
  const [customerId, setCustomerId] = useAtom(currentCustomerIdAtom);

  React.useEffect(() => {
    if (customers.length) {
      setCustomerId(customers[0].id);
    }
  }, [customers.length]);

  const handleCustomerSelection = (id: string) => {
    if (id !== customerId) {
      setCustomerId(id);
    }

    onClose();
  };

  return (
    <>
      {customers.map(({ id, name }) => (
        <Link key={id} onClick={() => handleCustomerSelection(id)} style={{ textDecoration: "none" }}>
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              border: "1px",
              borderColor: "gray.500",
            }}
          >
            <Icon as={UserIcon} mr="4" fontSize="16" />

            <Text {...(id === customerId && { as: "u" })}>{name}</Text>
          </Flex>
        </Link>
      ))}
    </>
  );
};

export default Customers;
