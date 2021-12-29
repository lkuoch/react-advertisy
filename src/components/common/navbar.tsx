import * as React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Avatar, Flex, HStack, IconButton, Link, Spacer, Text, useColorModeValue, VStack } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        variant="outline"
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />

      <Text display={{ base: "flex" }} fontSize="2xl" fontFamily="monospace" fontWeight="bold" p={4}>
        Advertisy
      </Text>

      <Spacer display={{ sm: "none", md: "block" }} />

      <HStack spacing={{ base: "0", md: "6" }}>
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

export default Navbar;
