import React from "react";
import { useAtomValue } from "jotai/utils";
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr, useBreakpoint } from "@chakra-ui/react";

import { cartQueryAtom } from "../../features/cart/atoms";

import Description from "./description";
import Price from "./price";
import UserSelection from "./userSelection";

import type { Product } from "../../features/cart/types";

const TableSection = () => {
  const isMobile = useBreakpoint() === "base";
  const products = useAtomValue<Product[]>(cartQueryAtom);

  return (
    <Table colorScheme="gray" variant="striped" {...(isMobile && { size: "sm" })}>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Description</Th>
          <Th isNumeric>Price</Th>
          <Th isNumeric>Quantity</Th>
        </Tr>
      </Thead>

      <Tbody>
        {products.map((product) => (
          <Tr key={product.id}>
            <Td>{product.name}</Td>

            <Td>
              <Description product={product} />
            </Td>
            <Td>
              <Price product={product} />
            </Td>
            <Td>
              <UserSelection product={product} />
            </Td>
          </Tr>
        ))}
      </Tbody>
      <TableCaption>Purchase our products here</TableCaption>
    </Table>
  );
};

export default TableSection;
