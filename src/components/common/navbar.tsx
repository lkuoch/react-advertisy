import * as React from "react";
import { Avatar, Flex, HStack, IconButton, Link, Spacer, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import MenuIcon from "@heroicons/react/outline/MenuIcon";

import DarkModeToggle from "./darkModeToggle";

interface Props {
  onOpen: () => void;
}

export default ({ onOpen }: Props) => {
  return (
    <Flex
      alignItems="center"
      height="20"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      borderBottomWidth="1px"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
    >
      <IconButton
        aria-label="open menu"
        display={{ base: "flex", md: "none" }}
        icon={<MenuIcon />}
        onClick={onOpen}
        variant="outline"
      />

      <Text display={{ base: "flex" }} fontSize="2xl" fontFamily="monospace" fontWeight="bold" p={4}>
        Advertisy
      </Text>

      <Spacer display={{ sm: "none", md: "block" }} />

      <HStack spacing={{ base: "2", md: "4" }}>
        <DarkModeToggle aria-label="Toggle dark mode" />

        <Flex alignItems={"center"}>
          <HStack>
            <Link href="https://github.com/lkuoch" isExternal>
              <Avatar size={"sm"} src={"https://avatars.githubusercontent.com/u/36609992?v=4"} />
            </Link>
            <VStack display={{ base: "none", md: "flex" }} alignItems="flex-start" spacing="1px" ml="2">
              <Text fontSize="sm">Lawrence Kuoch</Text>
              <Text fontSize="xs" color="gray.600">
                Admin
              </Text>
            </VStack>
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};
