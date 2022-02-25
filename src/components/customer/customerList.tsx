import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import UserIcon from "@heroicons/react/outline/UserIcon";
import { Flex, Icon, Link, Text } from "@chakra-ui/react";

import { customerApi, actions, selectors } from "../../features/customer";

interface Props {
  onClose: () => void;
}

export default ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const { isError } = customerApi.useFetchCustomersQuery();

  const customers = useSelector(selectors.entitySelectors.selectAll);
  const customerId = useSelector(selectors.selectCurrentCustomerId);

  const handleCustomerSelection = (id: string) => {
    if (id !== customerId) {
      dispatch(actions.updateCurrentCustomer(id));
    }

    onClose();
  };

  if (isError) {
    return <h1>Error</h1>;
  }

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
