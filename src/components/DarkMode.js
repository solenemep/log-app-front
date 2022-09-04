import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const DarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button size={"md"} aria-label="Dark Mode" onClick={toggleColorMode}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default DarkMode;
