import React from "react";
import { useAtomValue } from "jotai";
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr, useBreakpoint } from "@chakra-ui/react";

import { cartQueryAtom } from "../../features/cart/atoms";

import Description from "./description";
import Price from "./price";
import UserSelection from "./userSelection";

import { Product } from "../../schema/generated";

export default () => {
  const isMobile = ["base", "sm"].includes(useBreakpoint() ?? "");
  const products = useAtomValue<Product[]>(cartQueryAtom);

  return (
    <Table colorScheme="gray" variant="striped" {...(isMobile && { size: "sm" })}>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Description</Th>
          <Th>Price</Th>
          <Th>Quantity</Th>
        </Tr>
      </Thead>

      <Tbody>
        {products.map((product) => (
          <Tr key={product.id}>
            <Td maxWidth="100px">{product.name}</Td>

            <Td>
              <Description product={product} />
            </Td>
            <Td maxWidth="100px">
              <Price product={product} />
            </Td>
            <Td maxWidth="100px">
              <UserSelection product={product} />
            </Td>
          </Tr>
        ))}
      </Tbody>
      <TableCaption>Purchase our products here</TableCaption>
    </Table>
  );
};
