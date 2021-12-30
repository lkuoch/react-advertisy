import * as React from "react";
import { IconButtonProps, IconButton, useColorMode } from "@chakra-ui/react";
import DarkModeIcon from "@heroicons/react/outline/MoonIcon";
import LightModeIcon from "@heroicons/react/outline/SunIcon";

interface Props extends IconButtonProps {}

const DarkModeToggle = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      onClick={toggleColorMode}
      {...props}
    />
  );
};

export default DarkModeToggle;
